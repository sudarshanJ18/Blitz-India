const Project = require('../../models/Project');
const logger = require('../../utils/logger');
const { AppError } = require('../../middleware/errorHandler');


const getAllProjects = async (req, res, next) => {
    try {
        const projects = await Project.find().sort({ featured: -1, date: -1, order: 1 });

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};


const getProjectById = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        res.json({ success: true, data: project });
    } catch (error) {
        next(error);
    }
};


const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);

        logger.info(`Project created: ${project.title} by ${req.admin.email}`);

        res.status(201).json({
            success: true,
            message: 'Project created successfully',
            data: project
        });
    } catch (error) {
        next(error);
    }
};


const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        logger.info(`Project updated: ${project.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Project updated successfully',
            data: project
        });
    } catch (error) {
        next(error);
    }
};


const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);

        if (!project) {
            throw new AppError('Project not found', 404);
        }

        logger.info(`Project deleted: ${project.title} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
};
