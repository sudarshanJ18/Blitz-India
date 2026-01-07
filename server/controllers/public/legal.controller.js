const LegalContent = require('../../models/LegalContent');


const getPrivacyPolicy = async (req, res, next) => {
    try {
        let content = await LegalContent.findOne({ type: 'privacy' });

        if (!content) {
            content = await LegalContent.create({
                type: 'privacy',
                content: 'Privacy Policy content will be updated soon.'
            });
        }

        res.json({
            success: true,
            data: {
                content: content.content,
                lastUpdated: content.lastUpdated,
                version: content.version
            }
        });
    } catch (error) {
        next(error);
    }
};


const getTermsOfService = async (req, res, next) => {
    try {
        let content = await LegalContent.findOne({ type: 'terms' });

        if (!content) {
            content = await LegalContent.create({
                type: 'terms',
                content: 'Terms of Service content will be updated soon.'
            });
        }

        res.json({
            success: true,
            data: {
                content: content.content,
                lastUpdated: content.lastUpdated,
                version: content.version
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPrivacyPolicy,
    getTermsOfService
};
