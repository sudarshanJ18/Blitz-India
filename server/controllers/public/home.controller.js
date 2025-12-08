const HomeContent = require('../../models/HomeContent');

/**
 * Get home page content (Public)
 * GET /api/home
 */
const getHomeContent = async (req, res, next) => {
    try {
        const content = await HomeContent.getSingleton();

        res.json({
            success: true,
            data: content
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHomeContent
};
