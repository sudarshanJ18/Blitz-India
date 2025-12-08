const Service = require('../../models/Service');
const ServiceCategory = require('../../models/ServiceCategory');
const logger = require('../../utils/logger');
const { AppError } = require('../../middleware/errorHandler');

// SERVICES

/**
 * Get all services (Admin - includes unpublished)
 * GET /api/admin/services
 */
const getAllServices = async (req, res, next) => {
    try {
        const services = await Service.find().sort({ categoryId: 1, order: 1, subId: 1 });

        res.json({
            success: true,
            count: services.length,
            data: services
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Get single service by ID
 * GET /api/admin/services/:id
 */
const getServiceById = async (req, res, next) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            throw new AppError('Service not found', 404);
        }

        res.json({ success: true, data: service });
    } catch (error) {
        next(error);
    }
};

/**
 * Create new service
 * POST /api/admin/services
 */
const createService = async (req, res, next) => {
    try {
        const service = await Service.create(req.body);

        logger.info(`Service created: ${service.title} by ${req.admin.email}`);

        res.status(201).json({
            success: true,
            message: 'Service created successfully',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update service
 * PUT /api/admin/services/:id
 */
const updateService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!service) {
            throw new AppError('Service not found', 404);
        }

        logger.info(`Service updated: ${service.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Service updated successfully',
            data: service
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete service
 * DELETE /api/admin/services/:id
 */
const deleteService = async (req, res, next) => {
    try {
        const service = await Service.findByIdAndDelete(req.params.id);

        if (!service) {
            throw new AppError('Service not found', 404);
        }

        logger.info(`Service deleted: ${service.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Service deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

// SERVICE CATEGORIES

/**
 * Get all categories (Admin - includes unpublished)
 * GET /api/admin/services/categories
 */
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await ServiceCategory.find().sort({ order: 1, categoryId: 1 });

        res.json({
            success: true,
            count: categories.length,
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Create service category
 * POST /api/admin/services/categories
 */
const createCategory = async (req, res, next) => {
    try {
        const category = await ServiceCategory.create(req.body);

        logger.info(`Service category created: ${category.title} by ${req.admin.email}`);

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Update service category
 * PUT /api/admin/services/categories/:id
 */
const updateCategory = async (req, res, next) => {
    try {
        const category = await ServiceCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!category) {
            throw new AppError('Category not found', 404);
        }

        logger.info(`Service category updated: ${category.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Category updated successfully',
            data: category
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Delete service category
 * DELETE /api/admin/services/categories/:id
 */
const deleteCategory = async (req, res, next) => {
    try {
        const category = await ServiceCategory.findByIdAndDelete(req.params.id);

        if (!category) {
            throw new AppError('Category not found', 404);
        }

        logger.info(`Service category deleted: ${category.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Category deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllServices,
    getServiceById,
    createService,
    updateService,
    deleteService,
    getAllCategories,
    createCategory,
    updateCategory,
    deleteCategory
};
