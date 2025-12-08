const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { generateSecret } = require('../utils/totp');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name'],
        trim: true,
        maxlength: [100, 'Name cannot exceed 100 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email']
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false // Don't include password in queries by default
    },
    role: {
        type: String,
        enum: ['admin', 'super-admin'],
        default: 'admin'
    },
    totpSecret: {
        type: String,
        select: false // Don't include TOTP secret in queries by default
    },
    totpEnabled: {
        type: Boolean,
        default: false
    },
    backupCodes: {
        type: [{
            code: String,
            used: { type: Boolean, default: false }
        }],
        select: false
    },
    resetPasswordToken: {
        type: String,
        select: false
    },
    resetPasswordExpires: {
        type: Date,
        select: false
    },
    lastLogin: {
        type: Date
    }
}, {
    timestamps: true
});

// Index for faster email lookups
// Note: email field already has unique: true which creates an index automatically

// Hash password before saving
adminSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

// Method to compare password
adminSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// Method to generate TOTP secret
adminSchema.methods.generateTOTPSecret = function () {
    const secret = generateSecret();
    this.totpSecret = secret.base32;
    return secret; // Return the full secret object so we can generate QR code
};

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
