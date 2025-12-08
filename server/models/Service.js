const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a service title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    category: {
        type: String,
        required: true
    },
    categoryId: {
        type: Number,
        required: true
    },
    subId: {
        type: Number,
        required: true
    },
    shortDescription: {
        type: String,
        required: true,
        maxlength: 200
    },
    description: {
        type: String,
        required: true
    },
    image: String,
    features: [String],
    timeline: String,
    order: {
        type: Number,
        default: 0
    },
    published: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

// Indexes for efficient queries
// Note: slug field already has unique: true which creates an index automatically
serviceSchema.index({ published: 1 });
serviceSchema.index({ categoryId: 1, subId: 1 });

// Generate slug from title before saving
serviceSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
