const express = require('express');
const router = express.Router();
const { getAboutContent } = require('../../controllers/public/about.controller');




router.get('/', getAboutContent);

module.exports = router;
