const { AppError } = require('../../middleware/errorHandler');
const logger = require('../../utils/logger');


const uploadFile = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new AppError('No file uploaded', 400);
        }

        
        
        const fileUrl = `/uploads/admin/${req.file.filename}`;

        logger.info(`File uploaded by admin: ${req.file.filename}`);

        res.status(201).json({
            success: true,
            message: 'File uploaded successfully',
            url: fileUrl,
            filename: req.file.filename
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    uploadFile
};
