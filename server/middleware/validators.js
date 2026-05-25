const { body, validationResult } = require('express-validator');

/**
 * Validation middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg,
      })),
    });
  }
  next();
};

/**
 * Validators for authentication endpoints
 */
const validateLogin = [
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 1 })
    .withMessage('Password cannot be empty'),
  handleValidationErrors,
];

const validateRegisterAdmin = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  body('role')
    .optional()
    .isIn(['admin', 'superadmin'])
    .withMessage('Invalid role'),
  handleValidationErrors,
];

const validateChangePassword = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  body('newPassword')
    .isLength({ min: 8 })
    .withMessage('New password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
  handleValidationErrors,
];

/**
 * Validators for project endpoints
 */
const validateCreateProject = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Description is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .trim()
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['residential', 'commercial', 'industrial', 'renovation', 'new-construction'])
    .withMessage('Invalid category'),
  body('location')
    .trim()
    .notEmpty()
    .withMessage('Location is required')
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be between 1 and 100 characters'),
  handleValidationErrors,
];

const validateUpdateProject = [
  body('title')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Title must be between 1 and 100 characters'),
  body('description')
    .optional()
    .trim()
    .isLength({ min: 10, max: 1000 })
    .withMessage('Description must be between 10 and 1000 characters'),
  body('category')
    .optional()
    .trim()
    .isIn(['residential', 'commercial', 'industrial', 'renovation', 'new-construction'])
    .withMessage('Invalid category'),
  body('location')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Location must be between 1 and 100 characters'),
  handleValidationErrors,
];

/**
 * Validators for settings endpoints
 */
const validateUpdateSettings = [
  body('studioName')
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Studio name must be between 1 and 100 characters'),
  body('phone')
    .optional()
    .trim()
    .matches(/^[0-9+\s\-()]{5,20}$/)
    .withMessage('Invalid phone number format'),
  body('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format')
    .normalizeEmail(),
  body('address')
    .optional()
    .trim()
    .isLength({ min: 5, max: 200 })
    .withMessage('Address must be between 5 and 200 characters'),
  body('instagram')
    .optional()
    .trim()
    .isURL()
    .withMessage('Instagram URL must be valid'),
  body('facebook')
    .optional()
    .trim()
    .isURL()
    .withMessage('Facebook URL must be valid'),
  body('linkedin')
    .optional()
    .trim()
    .isURL()
    .withMessage('LinkedIn URL must be valid'),
  handleValidationErrors,
];

module.exports = {
  validateLogin,
  validateRegisterAdmin,
  validateChangePassword,
  validateCreateProject,
  validateUpdateProject,
  validateUpdateSettings,
  handleValidationErrors,
};
