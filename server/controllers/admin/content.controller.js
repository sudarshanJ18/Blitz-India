const HomeContent = require('../../models/HomeContent');
const AboutContent = require('../../models/AboutContent');
const LegalContent = require('../../models/LegalContent');
const logger = require('../../utils/logger');


const getHomeContent = async (req, res, next) => {
    try {
        const content = await HomeContent.getSingleton();
        res.json({ success: true, data: content });
    } catch (error) {
        next(error);
    }
};


const updateHomeContent = async (req, res, next) => {
    try {
        let content = await HomeContent.getSingleton();

        
        if (req.body.hero) content.hero = { ...content.hero.toObject(), ...req.body.hero };
        if (req.body.stats) content.stats = req.body.stats;
        if (req.body.highlights) content.highlights = req.body.highlights;

        await content.save();

        logger.info(`Home content updated by admin: ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Home content updated successfully',
            data: content
        });
    } catch (error) {
        next(error);
    }
};


const getAboutContent = async (req, res, next) => {
    try {
        const content = await AboutContent.getSingleton();
        res.json({ success: true, data: content });
    } catch (error) {
        next(error);
    }
};


const updateAboutContent = async (req, res, next) => {
    try {
        let content = await AboutContent.getSingleton();

        
        if (req.body.hero) content.hero = { ...content.hero.toObject(), ...req.body.hero };
        if (req.body.story) content.story = { ...content.story.toObject(), ...req.body.story };
        if (req.body.values) content.values = req.body.values;
        if (req.body.stats) content.stats = req.body.stats;
        if (req.body.capabilities) content.capabilities = req.body.capabilities;
        if (req.body.leadership) content.leadership = req.body.leadership;

        await content.save();

        logger.info(`About content updated by admin: ${req.admin.email}`);

        res.json({
            success: true,
            message: 'About content updated successfully',
            data: content
        });
    } catch (error) {
        next(error);
    }
};


const getLegalContent = async (req, res, next) => {
    try {
        const { type } = req.params;

        if (!['privacy', 'terms'].includes(type)) {
            const { AppError } = require('../../middleware/errorHandler');
            throw new AppError('Invalid legal content type', 400);
        }

        let content = await LegalContent.findOne({ type });

        if (!content) {
            content = await LegalContent.create({
                type,
                content: ''
            });
        }

        res.json({ success: true, data: content });
    } catch (error) {
        next(error);
    }
};


const updateLegalContent = async (req, res, next) => {
    try {
        const { type } = req.params;
        const { content: newContent } = req.body;

        if (!['privacy', 'terms'].includes(type)) {
            const { AppError } = require('../../middleware/errorHandler');
            throw new AppError('Invalid legal content type', 400);
        }

        let content = await LegalContent.findOne({ type });

        if (!content) {
            content = await LegalContent.create({
                type,
                content: newContent
            });
        } else {
            content.content = newContent;
            await content.save();
        }

        logger.info(`Legal content (${type}) updated by admin: ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Legal content updated successfully',
            data: content
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeContent,
    updateHomeContent,
    getAboutContent,
    updateAboutContent,
    getLegalContent,
    updateLegalContent
};
