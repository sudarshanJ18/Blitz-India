const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword, verifyResetToken } = require('../../controllers/auth/password-reset.controller');

// @route   POST /api/auth/forgot-password
// @desc    Request password reset email
// @access  Public
router.post('/forgot-password', forgotPassword);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.post('/reset-password/:token', resetPassword);

// @route   GET /api/auth/verify-reset-token/:token
// @desc    Verify if reset token is valid
// @access  Public
router.get('/verify-reset-token/:token', verifyResetToken);

module.exports = router;
