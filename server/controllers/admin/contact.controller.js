const ContactSubmission = require('../../models/ContactSubmission');
const logger = require('../../utils/logger');
const { AppError } = require('../../middleware/errorHandler');


const getAllSubmissions = async (req, res, next) => {
    try {
        const { status, page = 1, limit = 20 } = req.query;

        const filter = {};
        if (status) {
            filter.status = status;
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);

        const [submissions, total] = await Promise.all([
            ContactSubmission.find(filter)
                .sort({ submittedAt: -1 })
                .skip(skip)
                .limit(parseInt(limit)),
            ContactSubmission.countDocuments(filter)
        ]);

        res.json({
            success: true,
            count: submissions.length,
            total,
            page: parseInt(page),
            pages: Math.ceil(total / parseInt(limit)),
            data: submissions
        });
    } catch (error) {
        next(error);
    }
};


const getSubmissionById = async (req, res, next) => {
    try {
        const submission = await ContactSubmission.findById(req.params.id);

        if (!submission) {
            throw new AppError('Submission not found', 404);
        }

        res.json({ success: true, data: submission });
    } catch (error) {
        next(error);
    }
};


const updateSubmissionStatus = async (req, res, next) => {
    try {
        const { status, notes } = req.body;

        const submission = await ContactSubmission.findById(req.params.id);

        if (!submission) {
            throw new AppError('Submission not found', 404);
        }

        if (status) submission.status = status;
        if (notes !== undefined) submission.notes = notes;

        await submission.save();

        logger.info(`Contact submission ${submission._id} status updated to ${status} by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Submission status updated successfully',
            data: submission
        });
    } catch (error) {
        next(error);
    }
};


const deleteSubmission = async (req, res, next) => {
    try {
        const submission = await ContactSubmission.findByIdAndDelete(req.params.id);

        if (!submission) {
            throw new AppError('Submission not found', 404);
        }

        logger.info(`Contact submission deleted by ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Submission deleted successfully'
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllSubmissions,
    getSubmissionById,
    updateSubmissionStatus,
    deleteSubmission
};
