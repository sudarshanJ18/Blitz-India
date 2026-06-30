const express = require('express');
const router = express.Router();
const { authLimiter } = require('../middleware/rateLimiter');
const { validateLogin, validateCreateAdmin } = require('../middleware/validate');
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




router.post('/login', authLimiter, validateLogin, login);




router.get('/logout', logout);




router.post('/verify-login-mfa', authLimiter, verifyLoginMfa);




router.get('/me', verifyToken, requireAdmin, getMe);




router.post('/setup-mfa', verifyToken, requireAdmin, setupMFA);




router.post('/verify-mfa-setup', verifyToken, requireAdmin, verifyMFASetup);




router.post('/disable-mfa', verifyToken, requireAdmin, disableMFA);





router.post('/create-admin', authLimiter, validateCreateAdmin, createAdmin);

module.exports = router;
