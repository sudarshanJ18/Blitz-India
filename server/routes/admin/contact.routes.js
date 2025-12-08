const express = require('express');
const router = express.Router();
const { verifyToken, requireAdmin } = require('../../middleware/auth');
const { validateObjectId } = require('../../middleware/validate');
const {
    getAllSubmissions,
    getSubmissionById,
    updateSubmissionStatus,
    deleteSubmission
} = require('../../controllers/admin/contact.controller');

// All routes require authentication
router.use(verifyToken, requireAdmin);

router.get('/submissions', getAllSubmissions);
router.get('/submissions/:id', validateObjectId, getSubmissionById);
router.put('/submissions/:id/status', validateObjectId, updateSubmissionStatus);
router.delete('/submissions/:id', validateObjectId, deleteSubmission);

module.exports = router;
