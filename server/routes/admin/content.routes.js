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


router.use(verifyToken, requireAdmin);


router.get('/home', getHomeContent);
router.put('/home', updateHomeContent);


router.get('/about', getAboutContent);
router.put('/about', updateAboutContent);


router.get('/legal/:type', getLegalContent);
router.put('/legal/:type', updateLegalContent);

module.exports = router;
