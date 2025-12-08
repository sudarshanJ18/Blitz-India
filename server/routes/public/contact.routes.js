const express = require('express');
const router = express.Router();
const { contactLimiter } = require('../../middleware/rateLimiter');
const { validateContactForm } = require('../../middleware/validate');
const { submitContactForm } = require('../../controllers/public/contact.controller');
const { uploadToMemory } = require('../../middleware/upload');

// @route   POST /api/contact
// @desc    Submit contact form
// @access  Public (but rate limited)
router.post('/', contactLimiter, uploadToMemory.single('attachment'), validateContactForm, submitContactForm);

module.exports = router;
