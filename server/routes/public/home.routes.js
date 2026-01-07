const express = require('express');
const router = express.Router();
const { getHomeContent } = require('../../controllers/public/home.controller');




router.get('/', getHomeContent);

module.exports = router;
