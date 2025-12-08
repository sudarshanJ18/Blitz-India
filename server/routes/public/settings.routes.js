const express = require('express');
const router = express.Router();
const { getPublicSettings } = require('../../controllers/public/settings.controller');

// @route   GET /api/settings/public
// @desc    Get public site settings
// @access  Public
router.get('/public', getPublicSettings);

module.exports = router;
