const express = require('express');
const router = express.Router();
const { getPublicSettings } = require('../../controllers/public/settings.controller');




router.get('/public', getPublicSettings);

module.exports = router;
