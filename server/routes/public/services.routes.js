const express = require('express');
const router = express.Router();
const {
    getAllServices,
    getAllCategories,
    getServiceBySlug
} = require('../../controllers/public/services.controller');

// @route   GET /api/services/categories
// @desc    Get all published service categories
// @access  Public
router.get('/categories', getAllCategories);

// @route   GET /api/services/:slug
// @desc    Get single service by slug
// @access  Public
router.get('/:slug', getServiceBySlug);

// @route   GET /api/services
// @desc    Get all published services
// @access  Public
router.get('/', getAllServices);

module.exports = router;
