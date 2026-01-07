const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
    categoryId: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Please provide a category title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: String,
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





serviceCategorySchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    next();
});

const ServiceCategory = mongoose.model('ServiceCategory', serviceCategorySchema);

module.exports = ServiceCategory;
