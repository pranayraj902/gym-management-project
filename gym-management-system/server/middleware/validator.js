const { body, validationResult } = require('express-validator');

const validateMember = [
    body('name').notEmpty().withMessage('Name is required'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Gender must be Male, Female, or Other'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('address').notEmpty().withMessage('Address is required'),
    body('join_date').isDate().withMessage('Join date must be a valid date'),
];

const validateTrainer = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email address'),
    body('phone').isMobilePhone().withMessage('Invalid phone number'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('hire_date').isDate().withMessage('Hire date must be a valid date'),
];

const validateSession = [
    body('date').isDate().withMessage('Date must be a valid date'),
    body('duration').isNumeric().withMessage('Duration must be a number'),
    body('type').notEmpty().withMessage('Type is required'),
    body('trainer_id').isNumeric().withMessage('Trainer ID must be a number'),
];

const validatePayment = [
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('mode').notEmpty().withMessage('Payment mode is required'),
    body('member_id').isNumeric().withMessage('Member ID must be a number'),
];

const validateFeedback = [
    body('comments').notEmpty().withMessage('Comments are required'),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('member_id').isNumeric().withMessage('Member ID must be a number'),
];

const validateEquipment = [
    body('name').notEmpty().withMessage('Name is required'),
    body('type').notEmpty().withMessage('Type is required'),
];

const validateAttendance = [
    body('member_id').isNumeric().withMessage('Member ID must be a number'),
];

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    validateMember,
    validateTrainer,
    validateSession,
    validatePayment,
    validateFeedback,
    validateEquipment,
    validateAttendance,
    validateRequest,
};