const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const { validateObjectId } = require('../../middleware/validate');
const {
    getAllProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject
} = require('../../controllers/admin/projects.controller');

// All routes require authentication
router.use(verifyToken, requireAdmin);

router.get('/', getAllProjects);
router.get('/:id', validateObjectId, getProjectById);
router.post('/', createProject);
router.put('/:id', validateObjectId, updateProject);
router.delete('/:id', validateObjectId, deleteProject);

module.exports = router;
