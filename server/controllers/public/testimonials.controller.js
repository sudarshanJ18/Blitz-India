const Testimonial = require('../../models/Testimonial');


const getAllTestimonials = async (req, res, next) => {
    try {
        
        const query = {};

        
        if (req.query.featured !== undefined) {
            query.featured = req.query.featured === 'true';
        }

        
        if (req.query.published !== undefined) {
            query.published = req.query.published === 'true';
        }

        
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
