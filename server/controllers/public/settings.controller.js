const SiteSettings = require('../../models/SiteSettings');

/**
 * Get public site settings
 * GET /api/settings/public
 */
const getPublicSettings = async (req, res, next) => {
    try {
        const settings = await SiteSettings.getSingleton();

        // Return only public-facing settings
        res.json({
            success: true,
            data: {
                companyName: settings.companyName,
                tagline: settings.tagline,
                description: settings.description,
                email: settings.email,
                phone: settings.phone,
                address: settings.address,
                socialLinks: settings.socialLinks,
                logo: settings.logo
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPublicSettings
};
