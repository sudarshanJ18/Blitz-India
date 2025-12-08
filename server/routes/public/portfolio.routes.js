const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectBySlug
} = require('../../controllers/public/portfolio.controller');

// @route   GET /api/portfolio/:slug
// @desc    Get single project by slug
// @access  Public
router.get('/:slug', getProjectBySlug);

// @route   GET /api/portfolio
// @desc    Get all published projects
// @access  Public
router.get('/', getAllProjects);

module.exports = router;
