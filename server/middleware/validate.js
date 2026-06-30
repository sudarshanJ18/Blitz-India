const { validationResult } = require('express-validator');
const { body, param } = require('express-validator');


const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array().map(err => ({
                field: err.path || err.param,
                message: err.msg
            }))
        });
    }
    next();
};




const validateLogin = [
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    body('totpCode')
        .optional()
        .isLength({ min: 6, max: 6 })
        .withMessage('TOTP code must be 6 digits')
        .isNumeric()
        .withMessage('TOTP code must contain only numbers'),
    validate
];


const validateContactForm = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('phone')
        .trim()
        .notEmpty()
        .withMessage('Phone number is required')
        .matches(/^[\d\s\-\+\(\)]+$/)
        .withMessage('Please provide a valid phone number'),
    body('company')
        .optional()
        .trim()
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),
    body('serviceCategory')
        .trim()
        .notEmpty()
        .withMessage('Service category is required'),
    body('serviceSubcategory')
        .optional()
        .trim(),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message is required')
        .isLength({ min: 10, max: 2000 })
        .withMessage('Message must be between 10 and 2000 characters'),
    body('consent')
        .custom(value => value === true || value === 'true')
        .withMessage('You must agree to the privacy policy'),
    validate
];


const validateCreateAdmin = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ min: 2, max: 100 })
        .withMessage('Name must be between 2 and 100 characters'),
    body('email')
        .isEmail()
        .withMessage('Please provide a valid email')
        .normalizeEmail(),
    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
        .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
    validate
];


const validateTOTPCode = [
    validate
];


const validateObjectId = [
    param('id')
        .isMongoId()
        .withMessage('Invalid ID format'),
    validate
];

module.exports = {
    validate,
    validateLogin,
    validateContactForm,
    validateCreateAdmin,
    validateTOTPCode,
    validateObjectId
};
