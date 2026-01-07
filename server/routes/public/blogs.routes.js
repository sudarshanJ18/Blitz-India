const express = require('express');
const router = express.Router();
const {
    getAllBlogs,
    getBlogBySlug
} = require('../../controllers/public/blogs.controller');




router.get('/:slug', getBlogBySlug);




router.get('/', getAllBlogs);

module.exports = router;
