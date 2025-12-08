const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { validateLogin, validateCreateAdmin, validateTOTPCode } = require('../middleware/validate');
const { verifyToken, requireAdmin } = require('../middleware/auth');
const {
    login,
    verifyLoginMfa,
    getMe,
    setupMFA,
    verifyMFASetup,
    disableMFA,
    createAdmin,
    logout
} = require('../controllers/auth.controller');

// @route   POST /api/auth/login
// @desc    Admin login step 1: Password check
// @access  Public (but rate limited)
router.post('/login', authLimiter, validateLogin, login);

// @route   GET /api/auth/logout
// @desc    Logout admin
// @access  Private
router.get('/logout', logout);

// @route   POST /api/auth/verify-login-mfa
// @desc    Admin login step 2: Verify TOTP
// @access  Public (but rate limited)
router.post('/verify-login-mfa', authLimiter, verifyLoginMfa);

// @route   GET /api/auth/me
// @desc    Get current authenticated admin
// @access  Private (requires JWT)
router.get('/me', verifyToken, requireAdmin, getMe);

// @route   POST /api/auth/setup-mfa
// @desc    Generate TOTP secret and QR code
// @access  Private (requires JWT)
router.post('/setup-mfa', verifyToken, requireAdmin, setupMFA);

// @route   POST /api/auth/verify-mfa-setup
// @desc    Verify and enable TOTP MFA
// @access  Private (requires JWT)
router.post('/verify-mfa-setup', verifyToken, requireAdmin, verifyMFASetup);

// @route   POST /api/auth/disable-mfa
// @desc    Disable TOTP MFA
// @access  Private (requires JWT)
router.post('/disable-mfa', verifyToken, requireAdmin, disableMFA);

// @route   POST /api/auth/create-admin
// @desc    Create new admin account
// @access  Public (should be disabled in production)
// NOTE: In production, comment this route out or add additional protection
router.post('/create-admin', authLimiter, validateCreateAdmin, createAdmin);

module.exports = router;
