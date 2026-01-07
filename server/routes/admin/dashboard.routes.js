const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const { getDashboardStats } = require('../../controllers/admin/dashboard.controller');


router.use(verifyToken, requireAdmin);

router.get('/stats', getDashboardStats);

module.exports = router;
