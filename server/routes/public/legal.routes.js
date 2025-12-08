const express = require('express');
const router = express.Router();
const {
    getPrivacyPolicy,
    getTermsOfService
} = require('../../controllers/public/legal.controller');

// @route   GET /api/legal/privacy
// @desc    Get privacy policy
// @access  Public
router.get('/privacy', getPrivacyPolicy);

// @route   GET /api/legal/terms
// @desc    Get terms of service
// @access  Public
router.get('/terms', getTermsOfService);

module.exports = router;
