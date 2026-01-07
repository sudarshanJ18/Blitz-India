const Blog = require('../../models/Blog');


const getAllBlogs = async (req, res, next) => {
    try {
        const { category, page = 1, limit = 10 } = req.query;

        const filter = { published: true };
        if (category) {
            filter.category = category;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [blogs, total] = await Promise.all([
            Blog.find(filter)
                .sort({ featured: -1, publishedDate: -1 })
                .skip(skip)
                .limit(parseInt(limit))
                .select('-content'), 
            Blog.countDocuments(filter)
        ]);

        res.json({
            success: true,
            count: blogs.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: blogs
        });
    } catch (error) {
        next(error);
    }
};


const getBlogBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const blog = await Blog.findOne({ slug, published: true });

        if (!blog) {
            const { AppError } = require('../../middleware/errorHandler');
            throw new AppError('Blog post not found', 404);
        }

        
        await blog.incrementViews();

        res.json({
            success: true,
            data: blog
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllBlogs,
    getBlogBySlug
};
