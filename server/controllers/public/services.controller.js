const Service = require('../../models/Service');
const ServiceCategory = require('../../models/ServiceCategory');


const getAllServices = async (req, res, next) => {
    try {
        const { category } = req.query;

        const filter = { published: true };
        if (category) {
            filter.category = category;
        }

        const services = await Service.find(filter).sort({ categoryId: 1, order: 1, subId: 1 });

        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};


const getAllCategories = async (req, res, next) => {
    try {
        const categories = await ServiceCategory.find({ published: true }).sort({ order: 1, categoryId: 1 });

        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};


const getServiceBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const service = await Service.findOne({ slug, published: true });

        if (!service) {
            const { AppError } = require('../../middleware/errorHandler');
            throw new AppError('Service not found', 404);
        }

        res.json({
            success: true,
            data: service
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getAllCategories,
    getServiceBySlug
};
