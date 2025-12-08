const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Public routes - /api/testimonials
const publicTestimonialsController = require('../controllers/public/testimonials.controller');
router.get('/', publicTestimonialsController.getAllTestimonials);

// Admin routes - /api/testimonials/admin/*
const adminTestimonialsController = require('../controllers/admin/testimonials.controller');
router.get('/admin', protect, adminTestimonialsController.getAllTestimonials);
router.get('/admin/:id', protect, adminTestimonialsController.getTestimonialById);
router.post('/admin', protect, adminTestimonialsController.createTestimonial);
router.put('/admin/:id', protect, adminTestimonialsController.updateTestimonial);
router.delete('/admin/:id', protect, adminTestimonialsController.deleteTestimonial);

module.exports = router;
