const express = require('express');
const router = express.Router();
const { getAboutContent } = require('../../controllers/public/about.controller');

// @route   GET /api/about
// @desc    Get about page content
// @access  Public
router.get('/', getAboutContent);

module.exports = router;
