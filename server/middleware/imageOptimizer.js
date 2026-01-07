const sharp = require('sharp');
const path = require('path');
const fs = require('fs').promises;
const logger = require('../utils/logger');


const optimizeImage = async (file, maxWidth = 1920, quality = 80) => {
    try {
        const ext = path.extname(file.originalname || file.filename);
        const filename = path.basename(file.path || file.filename, ext);
        const outputFilename = `${filename}.webp`;
        const outputPath = path.join(path.dirname(file.path), outputFilename);

        await sharp(file.path)
            .resize({ width: maxWidth, withoutEnlargement: true })
            .webp({ quality })
            .toFile(outputPath);

        
        try {
            await fs.unlink(file.path);
        } catch (err) {
            logger.warn(`Could not delete original file: ${file.path}`);
        }

        logger.info(`Image optimized: ${outputFilename}`);
        return outputPath;
    } catch (error) {
        logger.error('Image optimization failed:', error);
        throw error;
    }
};


const imageOptimizerMiddleware = async (req, res, next) => {
    try {
        if (req.file && req.file.mimetype?.startsWith('image/')) {
            const optimizedPath = await optimizeImage(req.file);
            req.file.path = optimizedPath;
            req.file.filename = path.basename(optimizedPath);
        }

        if (req.files && Array.isArray(req.files)) {
            for (let i = 0; i < req.files.length; i++) {
                if (req.files[i].mimetype?.startsWith('image/')) {
                    const optimizedPath = await optimizeImage(req.files[i]);
                    req.files[i].path = optimizedPath;
                    req.files[i].filename = path.basename(optimizedPath);
                }
            }
        }

        next();
    } catch (error) {
        logger.error('Image optimization middleware error:', error);
        
        next();
    }
};

module.exports = {
    optimizeImage,
    imageOptimizerMiddleware
};
