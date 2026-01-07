const AboutContent = require('../../models/AboutContent');


const getAboutContent = async (req, res, next) => {
    try {
        const content = await AboutContent.getSingleton();

        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAboutContent
};
