const Testimonial = require('../../models/Testimonial');
const logger = require('../../utils/logger');
const { AppError } = require('../../middleware/errorHandler');


const getAllTestimonials = async (req, res, next) => {
    try {
        const testimonials = await Testimonial.find()
            .sort({ featured: -1, order: 1, createdAt: -1 });

        res.json({
            success: true,
            count: testimonials.length,
            data: testimonials
        });
    } catch (error) {
        next(error);
    }
};


const getTestimonialById = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findById(req.params.id);

        if (!testimonial) {
            throw new AppError('Testimonial not found', 404);
        }

        res.json({ success: true, data: testimonial });
    } catch (error) {
        next(error);
    }
};


const createTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.create(req.body);

        logger.info(`Testimonial created: ${testimonial.name} by ${req.admin.email}`);

        res.status(201).json({
            success: true,
            message: 'Testimonial created successfully',
            data: testimonial
        });
    } catch (error) {
        next(error);
    }
};


const updateTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!testimonial) {
            throw new AppError('Testimonial not found', 404);
        }

        logger.info(`Testimonial updated: ${testimonial.name} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Testimonial updated successfully',
            data: testimonial
        });
    } catch (error) {
        next(error);
    }
};


const deleteTestimonial = async (req, res, next) => {
    try {
        const testimonial = await Testimonial.findByIdAndDelete(req.params.id);

        if (!testimonial) {
            throw new AppError('Testimonial not found', 404);
        }

        logger.info(`Testimonial deleted: ${testimonial.name} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Testimonial deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllTestimonials,
    getTestimonialById,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial
};
