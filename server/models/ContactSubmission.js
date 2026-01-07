const mongoose = require('mongoose');

const contactSubmissionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number'],
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    serviceCategory: {
        type: String,
        required: [true, 'Please select a service category'],
        trim: true
    },
    serviceSubcategory: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        required: [true, 'Please provide a message'],
        trim: true
    },
    attachment: String,
    consent: {
        type: Boolean,
        required: true,
        validate: {
            validator: function (v) {
                return v === true;
            },
            message: 'You must agree to the privacy policy'
        }
    },
    status: {
        type: String,
        enum: ['new', 'read', 'replied'],
        default: 'new'
    },
    notes: String,
    submittedAt: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});


contactSubmissionSchema.index({ email: 1 });
contactSubmissionSchema.index({ status: 1 });
contactSubmissionSchema.index({ submittedAt: -1 });

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);

module.exports = ContactSubmission;
