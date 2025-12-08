const mongoose = require('mongoose');

const testimonialSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide customer name'],
        trim: true
    },
    position: {
        type: String,
        required: [true, 'Please provide position/title'],
        trim: true
    },
    company: {
        type: String,
        required: [true, 'Please provide company name'],
        trim: true
    },
    testimonial: {
        type: String,
        required: [true, 'Please provide testimonial text'],
        trim: true
    },
    image: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 5
    },
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

// Indexes
testimonialSchema.index({ featured: 1 });
testimonialSchema.index({ published: 1 });
testimonialSchema.index({ order: 1 });
testimonialSchema.index({ createdAt: -1 });

const Testimonial = mongoose.model('Testimonial', testimonialSchema);

module.exports = Testimonial;
