const express = require('express');
const router = express.Router();
const { forgotPassword, resetPassword, verifyResetToken } = require('../../controllers/auth/password-reset.controller');




router.post('/forgot-password', forgotPassword);




router.post('/reset-password/:token', resetPassword);




router.get('/verify-reset-token/:token', verifyResetToken);

module.exports = router;
