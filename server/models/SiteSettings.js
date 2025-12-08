const mongoose = require('mongoose');

const siteSettingsSchema = new mongoose.Schema({
    companyName: {
        type: String,
        default: 'Blitz India Engineering'
    },
    tagline: {
        type: String,
        default: 'Engineering Excellence for Global Industries'
    },
    description: {
        type: String,
        default: 'Comprehensive design, FEA, and documentation services'
    },
    email: {
        type: String,
        default: 'info@blitzindiaengineering.com'
    },
    phone: {
        type: String,
        default: '+91-91585-75785'
    },
    address: {
        street: String,
        city: {
            type: String,
            default: 'Pune'
        },
        state: {
            type: String,
            default: 'Maharashtra'
        },
        country: {
            type: String,
            default: 'India'
        },
        zipCode: String
    },
    socialLinks: {
        facebook: String,
        twitter: String,
        linkedin: String,
        instagram: String,
        youtube: String
    },
    logo: String,
    favicon: String,
    metadata: {
        metaTitle: String,
        metaDescription: String,
        metaKeywords: [String],
        ogImage: String
    },
    robotsTxt: {
        type: String,
        default: 'User-agent: *\nDisallow: /admin/\nDisallow: /api/admin/'
    },
    adminPathExclusion: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Singleton pattern
siteSettingsSchema.statics.getSingleton = async function () {
    let settings = await this.findOne();
    if (!settings) {
        settings = await this.create({});
    }
    return settings;
};

const SiteSettings = mongoose.model('SiteSettings', siteSettingsSchema);

module.exports = SiteSettings;
