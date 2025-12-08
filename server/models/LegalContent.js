const mongoose = require('mongoose');

const legalContentSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        enum: ['privacy', 'terms'],
        unique: true
    },
    content: {
        type: String,
        required: true,
        default: ''
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    },
    version: {
        type: String,
        default: '1.0'
    }
}, {
    timestamps: true
});

// Index
// Note: type field already has unique: true which creates an index automatically

// Update lastUpdated when content changes
legalContentSchema.pre('save', function (next) {
    if (this.isModified('content')) {
        this.lastUpdated = Date.now();
    }
    next();
});

const LegalContent = mongoose.model('LegalContent', legalContentSchema);

module.exports = LegalContent;
