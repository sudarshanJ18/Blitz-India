const logger = require('../utils/logger');


const errorHandler = (err, req, res, next) => {
    
    logger.error('Error occurred:', {
        message: err.message,
        stack: err.stack,
        path: req.path,
        method: req.method
    });

    
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';
    let errors = err.errors || null;

    

    
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = 'Validation Error';
        errors = Object.values(err.errors).map(e => ({
            field: e.path,
            message: e.message
        }));
    }

    
    if (err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate Entry';
        const field = Object.keys(err.keyPattern)[0];
        errors = [{
            field: field,
            message: `${field} already exists`
        }];
    }

    
    if (err.name === 'CastError') {
        statusCode = 400;
        message = 'Invalid ID format';
    }

    
    if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid token';
    }

    if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token expired';
    }

    
    if (process.env.NODE_ENV === 'production' && statusCode === 500) {
        message = 'Something went wrong. Please try again later.';
    }

    
    res.status(statusCode).json({
        success: false,
        message,
        ...(errors && { errors }),
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};


const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
};


class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = {
    errorHandler,
    notFound,
    AppError
};
