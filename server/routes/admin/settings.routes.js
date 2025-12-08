const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const {
    getSettings,
    updateSettings
} = require('../../controllers/admin/settings.controller');

// All routes require authentication
router.use(verifyToken, requireAdmin);

router.get('/', getSettings);
router.put('/', updateSettings);

module.exports = router;
