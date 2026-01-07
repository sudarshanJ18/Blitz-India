const express = require('express');
const router = express.Router();
const { contactLimiter } = require('../../middleware/rateLimiter');
const { validateContactForm } = require('../../middleware/validate');
const { submitContactForm } = require('../../controllers/public/contact.controller');
const { uploadToMemory } = require('../../middleware/upload');




router.post('/', contactLimiter, uploadToMemory.single('attachment'), validateContactForm, submitContactForm);

module.exports = router;
