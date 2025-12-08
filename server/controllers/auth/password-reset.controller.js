const Admin = require('../../models/Admin');
const crypto = require('crypto');
const emailService = require('../../services/email.service');

/**
 * @desc    Request password reset - sends to configured admin email
 * @route   POST /api/auth/forgot-password
 * @access  Public
 */
exports.forgotPassword = async (req, res) => {
    try {
        // Use the configured admin email directly (no email input required)
        const adminEmail = process.env.ADMIN_EMAIL || 'jsudarshanreddy2003@gmail.com';

        // Find admin by the configured email
        const admin = await Admin.findOne({ email: adminEmail.toLowerCase() });

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: 'Admin account not found. Please contact system administrator.'
            });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and set expiry (1 hour)
        admin.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        admin.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour

        await admin.save();

        // Send email
        try {
            await emailService.sendPasswordResetEmail(
                admin.email,
                resetToken,
                admin.name
            );

            res.status(200).json({
                success: true,
                message: `Password reset link sent to ${adminEmail}. Please check your inbox.`
            });
        } catch (emailError) {
            // Reset the token fields if email fails
            admin.resetPasswordToken = undefined;
            admin.resetPasswordExpires = undefined;
            await admin.save();

            console.error('Email sending failed:', emailError);
            return res.status(500).json({
                success: false,
                message: 'Failed to send password reset email. Please configure email settings in .env file.'
            });
        }

    } catch (error) {
        console.error('Forgot password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while processing your request'
        });
    }
};

/**
 * @desc    Reset password with token
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
exports.resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password, confirmPassword } = req.body;

        // Validate inputs
        if (!password || !confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Please provide both password and confirm password'
            });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: 'Passwords do not match'
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long'
            });
        }

        // Hash the token from URL
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find admin with valid reset token
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        }).select('+resetPasswordToken +resetPasswordExpires');

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        // Set new password
        admin.password = password;
        admin.resetPasswordToken = undefined;
        admin.resetPasswordExpires = undefined;

        await admin.save();

        res.status(200).json({
            success: true,
            message: 'Password has been reset successfully. You can now login with your new password.'
        });

    } catch (error) {
        console.error('Reset password error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while resetting your password'
        });
    }
};

/**
 * @desc    Verify reset token validity
 * @route   GET /api/auth/verify-reset-token/:token
 * @access  Public
 */
exports.verifyResetToken = async (req, res) => {
    try {
        const { token } = req.params;

        // Hash the token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        // Find admin with valid reset token
        const admin = await Admin.findOne({
            resetPasswordToken: hashedToken,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!admin) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired reset token'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Token is valid'
        });

    } catch (error) {
        console.error('Verify token error:', error);
        res.status(500).json({
            success: false,
            message: 'An error occurred while verifying the token'
        });
    }
};
