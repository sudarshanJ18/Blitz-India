const express = require('express');
const router = express.Router();
const {
    getAllServices,
    getAllCategories,
    getServiceBySlug
} = require('../../controllers/public/services.controller');




router.get('/categories', getAllCategories);




router.get('/:slug', getServiceBySlug);




router.get('/', getAllServices);

module.exports = router;
