const Blog = require('../../models/Blog');
const logger = require('../../utils/logger');
const { AppError } = require('../../middleware/errorHandler');


const getAllBlogs = async (req, res, next) => {
    try {
        const blogs = await Blog.find().sort({ featured: -1, publishedDate: -1 });

        res.json({
            success: true,
            count: blogs.length,
            data: blogs
        });
    } catch (error) {
        next(error);
    }
};


const getBlogById = async (req, res, next) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            throw new AppError('Blog post not found', 404);
        }

        res.json({ success: true, data: blog });
    } catch (error) {
        next(error);
    }
};


const createBlog = async (req, res, next) => {
    try {
        const blog = await Blog.create(req.body);

        logger.info(`Blog created: ${blog.title} by ${req.admin.email}`);

        res.status(201).json({
            success: true,
            message: 'Blog post created successfully',
            data: blog
        });
    } catch (error) {
        next(error);
    }
};


const updateBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!blog) {
            throw new AppError('Blog post not found', 404);
        }

        logger.info(`Blog updated: ${blog.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Blog post updated successfully',
            data: blog
        });
    } catch (error) {
        next(error);
    }
};


const deleteBlog = async (req, res, next) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);

        if (!blog) {
            throw new AppError('Blog post not found', 404);
        }

        logger.info(`Blog deleted: ${blog.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Blog post deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
