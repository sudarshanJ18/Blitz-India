const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getBlogBySlug
} = require('../../controllers/public/blogs.controller');

// @route   GET /api/blogs/:slug
// @desc    Get single blog by slug
// @access  Public
router.get('/:slug', getBlogBySlug);

// @route   GET /api/blogs
// @desc    Get all published blogs with pagination
// @access  Public
router.get('/', getAllBlogs);

module.exports = router;
