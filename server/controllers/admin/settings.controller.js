const SiteSettings = require('../../models/SiteSettings');
const logger = require('../../utils/logger');


const getSettings = async (req, res, next) => {
    try {
        const settings = await SiteSettings.getSingleton();

        res.json({
            success: true,
            data: settings
        });
    } catch (error) {
        next(error);
    }
};


const updateSettings = async (req, res, next) => {
    try {
        let settings = await SiteSettings.getSingleton();

        
        Object.keys(req.body).forEach(key => {
            if (req.body[key] !== undefined) {
                settings[key] = req.body[key];
            }
        });

        await settings.save();

        logger.info(`Site settings updated by admin: ${req.admin.email}`);

        res.json({
            success: true,
            message: 'Settings updated successfully',
            data: settings
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getSettings,
    updateSettings
};
