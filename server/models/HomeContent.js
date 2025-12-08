const mongoose = require('mongoose');

const homeContentSchema = new mongoose.Schema({
    hero: {
        title: {
            type: String,
            required: true,
            default: 'Engineering Excellence for Global Industries'
        },
        subtitle: {
            type: String,
            default: 'Comprehensive Design, FEA, and Documentation Services'
        },
        description: {
            type: String,
            default: 'We deliver precision engineering solutions that drive innovation and efficiency across automotive, aerospace, and industrial sectors worldwide.'
        },
        ctaButton: {
            type: String,
            default: 'Explore Our Services'
        },
        backgroundImage: String
    },
    stats: [{
        label: String,
        value: String,
        icon: String
    }],
    highlights: [{
        title: String,
        description: String,
        icon: String,
        link: String
    }]
}, {
    timestamps: true
});

// Singleton pattern - only one home content document should exist
homeContentSchema.statics.getSingleton = async function () {
    let content = await this.findOne();
    if (!content) {
        content = await this.create({});
    }
    return content;
};

const HomeContent = mongoose.model('HomeContent', homeContentSchema);

module.exports = HomeContent;
