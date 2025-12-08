const Testimonial = require('../../models/Testimonial');

/**
 * Get testimonials (Public)
 * GET /api/testimonials
 * Query params: featured=true/false, published=true/false
 */
const getAllTestimonials = async (req, res, next) => {
    try {
        // Build query based on query parameters
        const query = {};

        // Filter by featured status if specified
        if (req.query.featured !== undefined) {
            query.featured = req.query.featured === 'true';
        }

        // Filter by published status if specified
        if (req.query.published !== undefined) {
            query.published = req.query.published === 'true';
        }

        // If no filters specified, default to published only
        if (Object.keys(query).length === 0) {
            query.published = true;
        }

        const testimonials = await Testimonial.find(query)
            .sort({ featured: -1, order: 1, createdAt: -1 })
            .select('-__v');

        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTestimonials
};
