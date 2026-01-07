const Project = require('../../models/Project');


const getAllProjects = async (req, res, next) => {
    try {
        const { category } = req.query;

        const filter = { published: true };
        if (category && category !== 'all') {
            filter.category = category;
        }

        const projects = await Project.find(filter).sort({ featured: -1, date: -1, order: 1 });

        res.json({
            success: true,
            count: projects.length,
            data: projects
        });
    } catch (error) {
        next(error);
    }
};


const getProjectBySlug = async (req, res, next) => {
    try {
        const { slug } = req.params;

        const project = await Project.findOne({ slug, published: true });

        if (!project) {
            const { AppError } = require('../../middleware/errorHandler');
            throw new AppError('Project not found', 404);
        }

        res.json({
            success: true,
            data: project
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllProjects,
    getProjectBySlug
};
