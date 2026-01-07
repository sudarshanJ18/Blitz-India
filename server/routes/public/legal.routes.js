const express = require('express');
const router = express.Router();
const {
    getPrivacyPolicy,
    getTermsOfService
} = require('../../controllers/public/legal.controller');




router.get('/privacy', getPrivacyPolicy);




router.get('/terms', getTermsOfService);

module.exports = router;
