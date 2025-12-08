const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const { AppError } = require('../middleware/errorHandler');
const { verifyToken: verifyTotpToken } = require('../utils/totp');
const logger = require('../utils/logger');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

/**
 * Generate backup codes
 */
const generateBackupCodes = async () => {
    const codes = [];
    const hashedCodes = [];

    for (let i = 0; i < 10; i++) {
        const code = crypto.randomBytes(4).toString('hex').toUpperCase(); // 8 chars
        codes.push(code);

        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(code, salt);
        hashedCodes.push({ code: hashed, used: false });
    }

    return { codes, hashedCodes };
};

/**
 * Admin login step 1: Password check
 * POST /api/auth/login
 */
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Find admin and include password
        const admin = await Admin.findOne({ email }).select('+password +totpEnabled');

        if (!admin) {
            throw new AppError('Invalid credentials', 401);
        }

        // Verify password
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            logger.warn(`Failed login attempt for ${email}: Invalid password`);
            throw new AppError('Invalid credentials', 401);
        }

        // If MFA is enabled, return intermediate token
        if (admin.totpEnabled) {
            const mfaToken = jwt.sign(
                { id: admin._id, mfaPending: true },
                process.env.JWT_SECRET,
                { expiresIn: '5m' } // Short expiry for MFA step
            );

            return res.json({
                success: true,
                mfaRequired: true,
                mfaToken
            });
        }

        // If MFA not enabled, check if we need to force setup
        // For now, we'll let the frontend handle the redirection based on totpEnabled: false

        // If MFA not enabled, complete login
        completeLogin(admin, res);
    } catch (error) {
        next(error);
    }
};

/**
 * Admin login step 2: Verify TOTP
 * POST /api/auth/verify-login-mfa
 */
const verifyLoginMfa = async (req, res, next) => {
    try {
        const { mfaToken, totpCode, backupCode } = req.body;

        if (!mfaToken) {
            throw new AppError('MFA token required', 401);
        }

        // Validate that either totpCode or backupCode is provided, but not both
        if ((!totpCode && !backupCode) || (totpCode && backupCode)) {
            throw new AppError('Either TOTP code or backup code is required', 400);
        }

        // Validate TOTP code format if provided
        if (totpCode && (typeof totpCode !== 'string' || totpCode.length !== 6 || !/^\d{6}$/.test(totpCode))) {
            throw new AppError('TOTP code must be a 6-digit number', 400);
        }

        // Validate backup code format if provided
        if (backupCode && (typeof backupCode !== 'string' || backupCode.length !== 8 || !/^[A-F0-9]{8}$/.test(backupCode))) {
            throw new AppError('Backup code must be an 8-character hexadecimal string', 400);
        }

        // Verify MFA pending token
        const decoded = jwt.verify(mfaToken, process.env.JWT_SECRET);
        if (!decoded.mfaPending) {
            throw new AppError('Invalid MFA token', 401);
        }

        const admin = await Admin.findById(decoded.id).select('+totpSecret +backupCodes');
        if (!admin) {
            throw new AppError('Admin not found', 404);
        }

        let isValid = false;

        // Verify TOTP code
        if (totpCode) {
            isValid = verifyTotpToken(admin.totpSecret, totpCode);
        }
        // Verify Backup code
        else if (backupCode) {
            const backupCodeIndex = await findBackupCodeIndex(admin.backupCodes, backupCode);
            if (backupCodeIndex !== -1) {
                isValid = true;
                // Mark code as used
                admin.backupCodes[backupCodeIndex].used = true;
                await admin.save();
                logger.info(`Backup code used for admin: ${admin.email}`);
            }
        }

        if (!isValid) {
            throw new AppError('Invalid code', 401);
        }

        completeLogin(admin, res);
    } catch (error) {
        next(error);
    }
};

// Helper to complete login and issue full token
const completeLogin = async (admin, res) => {
    admin.lastLogin = Date.now();
    await admin.save();

    const token = jwt.sign(
        { id: admin._id, email: admin.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    logger.info(`Admin logged in: ${admin.email}`);

    // Set cookie
    const cookieOptions = {
        expires: new Date(
            Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production'
    };

    res.cookie('token', token, cookieOptions);

    res.json({
        success: true,
        token, // Keep sending token for backward compatibility or client-side usage if needed
        admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            totpEnabled: admin.totpEnabled
        }
    });
};

// Helper to find backup code
const findBackupCodeIndex = async (hashedCodes, plainCode) => {
    for (let i = 0; i < hashedCodes.length; i++) {
        if (!hashedCodes[i].used) {
            const isMatch = await bcrypt.compare(plainCode, hashedCodes[i].code);
            if (isMatch) return i;
        }
    }
    return -1;
};

/**
 * Get current authenticated admin
 * GET /api/auth/me
 */
const getMe = async (req, res, next) => {
    try {
        res.json({
            success: true,
            admin: {
                id: req.admin._id,
                name: req.admin.name,
                email: req.admin.email,
                role: req.admin.role,
                totpEnabled: req.admin.totpEnabled,
                lastLogin: req.admin.lastLogin
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Setup TOTP MFA - Generate secret and QR code
 * POST /api/auth/setup-mfa
 */
const setupMFA = async (req, res, next) => {
    try {
        const admin = await Admin.findById(req.admin._id).select('+totpSecret');

        if (admin.totpEnabled) {
            throw new AppError('MFA is already enabled', 400);
        }

        // Generate TOTP secret
        const secret = admin.generateTOTPSecret();
        await admin.save();

        // Generate QR code using the full secret object to get otpauth_url
        const QRCode = require('qrcode');
        const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

        res.json({
            success: true,
            message: 'Scan this QR code with your authenticator app',
            qrCode: qrCodeUrl,
            secret: secret.base32
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Verify and enable TOTP MFA
 * POST /api/auth/verify-mfa-setup
 */
const verifyMFASetup = async (req, res, next) => {
    try {
        const { totpCode } = req.body;

        // Validate TOTP code
        if (!totpCode) {
            throw new AppError('TOTP code is required', 400);
        }

        if (typeof totpCode !== 'string' || totpCode.length !== 6 || !/^\d{6}$/.test(totpCode)) {
            throw new AppError('TOTP code must be a 6-digit number', 400);
        }

        const admin = await Admin.findById(req.admin._id).select('+totpSecret');

        if (!admin.totpSecret) {
            throw new AppError('Please setup MFA first', 400);
        }

        if (admin.totpEnabled) {
            throw new AppError('MFA is already enabled', 400);
        }

        // Verify TOTP code
        logger.info('Verifying TOTP Setup:', {
            email: req.admin.email,
            providedCode: totpCode,
            secretExists: !!admin.totpSecret,
            secretLength: admin.totpSecret ? admin.totpSecret.length : 0
        });

        const isValid = verifyTotpToken(admin.totpSecret, totpCode);
        logger.info(`TOTP Verification Result: ${isValid}`);

        if (!isValid) {
            throw new AppError('Invalid TOTP code', 400);
        }

        // Generate backup codes
        const { codes, hashedCodes } = await generateBackupCodes();

        // Enable TOTP and save backup codes
        admin.totpEnabled = true;
        admin.backupCodes = hashedCodes;
        await admin.save();

        logger.info(`MFA enabled for admin: ${admin.email}`);

        res.json({
            success: true,
            message: 'MFA enabled successfully',
            backupCodes: codes // Send plain codes once
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Disable TOTP MFA
 * POST /api/auth/disable-mfa
 */
const disableMFA = async (req, res, next) => {
    try {
        const { password } = req.body;

        // Validate password
        if (!password) {
            throw new AppError('Password is required', 400);
        }

        const admin = await Admin.findById(req.admin._id).select('+password');

        // Verify password before disabling
        const isPasswordValid = await admin.comparePassword(password);
        if (!isPasswordValid) {
            throw new AppError('Invalid password', 401);
        }

        admin.totpEnabled = false;
        admin.totpSecret = undefined;
        admin.backupCodes = undefined;
        await admin.save();

        logger.info(`MFA disabled for admin: ${admin.email}`);

        res.json({
            success: true,
            message: 'MFA disabled successfully'
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create admin account
 * POST /api/auth/create-admin
 */
const createAdmin = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new AppError('Admin with this email already exists', 400);
        }

        // Create admin
        const admin = await Admin.create({
            name,
            email,
            password,
            totpEnabled: false
        });

        logger.info(`New admin created: ${email}`);

        res.status(201).json({
            success: true,
            message: 'Admin created successfully. Please set up MFA.',
            admin: {
                id: admin._id,
                name: admin.name,
                email: admin.email
            }
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Logout admin
 * GET /api/auth/logout
 */
const logout = async (req, res, next) => {
    try {
        res.cookie('token', 'none', {
            expires: new Date(Date.now() + 10 * 1000),
            httpOnly: true
        });

        res.json({
            success: true,
            message: 'Logged out successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login,
    verifyLoginMfa,
    getMe,
    setupMFA,
    verifyMFASetup,
    disableMFA,
    createAdmin,
    logout
};
