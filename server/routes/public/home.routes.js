const express = require('express');
const router = express.Router();
const { getHomeContent } = require('../../controllers/public/home.controller');

// @route   GET /api/home
// @desc    Get home page content
// @access  Public
router.get('/', getHomeContent);

module.exports = router;
