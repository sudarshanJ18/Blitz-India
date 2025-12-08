const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const {
    getHomeContent,
    updateHomeContent,
    getAboutContent,
    updateAboutContent,
    getLegalContent,
    updateLegalContent
} = require('../../controllers/admin/content.controller');

// All routes require authentication
router.use(verifyToken, requireAdmin);

// Home content routes
router.get('/home', getHomeContent);
router.put('/home', updateHomeContent);

// About content routes
router.get('/about', getAboutContent);
router.put('/about', updateAboutContent);

// Legal content routes
router.get('/legal/:type', getLegalContent);
router.put('/legal/:type', updateLegalContent);

module.exports = router;
