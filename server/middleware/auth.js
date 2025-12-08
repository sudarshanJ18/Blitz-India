const jwt = require('jsonwebtoken');
const { AppError } = require('./errorHandler');
const Admin = require('../models/Admin');

/**
 * Verify JWT token and attach admin to request
 */
const verifyToken = async (req, res, next) => {
    try {
        // Get token from header or cookie
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.token) {
            token = req.cookies.token;
        }

        if (!token) {
            throw new AppError('No token provided', 401);
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Get admin from database
        const admin = await Admin.findById(decoded.id).select('-password -totpSecret');

        if (!admin) {
            throw new AppError('Admin not found', 401);
        }

        // Attach admin to request
        req.admin = admin;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return next(new AppError('Invalid token', 401));
        }
        if (error.name === 'TokenExpiredError') {
            return next(new AppError('Token expired', 401));
        }
        next(error);
    }
};

/**
 * Middleware to ensure user is authenticated admin
 * Use after verifyToken
 */
const requireAdmin = (req, res, next) => {
    if (!req.admin) {
        return next(new AppError('Admin authentication required', 403));
    }
    next();
};

// Alias for backward compatibility
const protect = verifyToken;

module.exports = {
    verifyToken,
    requireAdmin,
    protect
};
