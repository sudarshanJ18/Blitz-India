const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide a blog title'],
        trim: true
    },
    slug: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    summary: {
        type: String,
        required: true,
        maxlength: 300
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        default: 'Blitz India Engineering'
    },
    category: {
        type: String,
        default: 'Engineering'
    },
    tags: [String],
    image: String,
    publishedDate: {
        type: Date,
        default: Date.now
    },
    lastModified: {
        type: Date,
        default: Date.now
    },
    published: {
        type: Boolean,
        default: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    }
}, {
    timestamps: true
});



blogSchema.index({ published: 1 });
blogSchema.index({ category: 1 });
blogSchema.index({ publishedDate: -1 });
blogSchema.index({ featured: 1 });


blogSchema.pre('save', function (next) {
    if (this.isModified('title') && !this.slug) {
        this.slug = this.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }

    if (this.isModified('content')) {
        this.lastModified = Date.now();
    }

    next();
});


blogSchema.methods.incrementViews = function () {
    this.views += 1;
    return this.save();
};

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
