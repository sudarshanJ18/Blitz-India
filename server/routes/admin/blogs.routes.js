const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const { validateObjectId } = require('../../middleware/validate');
const {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
} = require('../../controllers/admin/blogs.controller');


router.use(verifyToken, requireAdmin);

router.get('/', getAllBlogs);
router.get('/:id', validateObjectId, getBlogById);
router.post('/', createBlog);
router.put('/:id', validateObjectId, updateBlog);
router.delete('/:id', validateObjectId, deleteBlog);

module.exports = router;
