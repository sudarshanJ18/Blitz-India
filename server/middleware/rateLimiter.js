const rateLimit = require('express-rate-limit');


const authLimiter = rateLimit({
    windowMs: parseInt(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, 
    max: parseInt(process.env.AUTH_RATE_LIMIT_MAX_REQUESTS) || 5, 
    message: {
        success: false,
        message: 'Too many authentication attempts. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false
});


const apiLimiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, 
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100, 
    message: {
        success: false,
        message: 'Too many requests. Please slow down.'
    },
    standardHeaders: true,
    legacyHeaders: false
});


const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, 
    max: 20, 
    message: {
        success: false,
        message: 'Too many contact submissions. Please try again later.'
    },
    standardHeaders: true,
    legacyHeaders: false
});

module.exports = {
    authLimiter,
    apiLimiter,
    contactLimiter
};
