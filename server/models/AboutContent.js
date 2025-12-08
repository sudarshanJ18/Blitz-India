const mongoose = require('mongoose');

const aboutContentSchema = new mongoose.Schema({
    hero: {
        title: {
            type: String,
            default: 'About Blitz India Engineering'
        },
        subtitle: String,
        image: String
    },
    story: {
        title: {
            type: String,
            default: 'Our Story'
        },
        content: String,
        images: [String]
    },
    values: [{
        title: String,
        description: String,
        icon: String,
        image: String
    }],
    stats: [{
        label: String,
        value: String,
        icon: String,
        description: String
    }],
    capabilities: [{
        title: String,
        description: String,
        icon: String,
        items: [String]
    }],
    leadership: [{
        name: String,
        role: String,
        bio: String,
        image: String,
        experience: String,
        expertise: [String],
        education: String,
        certifications: [String],
        order: {
            type: Number,
            default: 0
        }
    }]
}, {
    timestamps: true
});

// Singleton pattern
aboutContentSchema.statics.getSingleton = async function () {
    let content = await this.findOne();
    if (!content) {
        content = await this.create({});
    }
    return content;
};

const AboutContent = mongoose.model('AboutContent', aboutContentSchema);

module.exports = AboutContent;
