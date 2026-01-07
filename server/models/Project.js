const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a project title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    shortDescription: {
        type: String,
        required: true,
        maxlength: 200
    },
    description: {
        type: String
    },
    image: String, 
    images: [String], 
    category: {
        type: String
    },
    client: String,
    date: {
        type: Date,
        default: Date.now
    },
    duration: String,
    challenge: {
        type: String,
        trim: true
    },
    solution: {
        type: String,
        trim: true
    },
    results: [String],
    services: [String],
    tags: [String],
    featured: {
        type: Boolean,
        default: false
    },
    published: {
        type: Boolean,
        default: true
    },
    order: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});



projectSchema.index({ category: 1 });
projectSchema.index({ featured: 1 });
projectSchema.index({ published: 1 });
projectSchema.index({ date: -1 });


projectSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;
