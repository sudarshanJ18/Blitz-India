const express = require('express');
const router = express.Router();
const {
    getAllProjects,
    getProjectBySlug
} = require('../../controllers/public/portfolio.controller');




router.get('/:slug', getProjectBySlug);




router.get('/', getAllProjects);

module.exports = router;
