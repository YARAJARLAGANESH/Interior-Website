const express = require('express');

const {
  loginAdmin,
  registerAdmin,
  changePassword
} = require('../controllers/authController.js');

const {
  protect,
  authorize
} = require('../middleware/auth');

const {
  validateLogin,
  validateRegisterAdmin,
  validateChangePassword,
} = require('../middleware/validators');

const router = express.Router();

// Admin Login
router.post('/login', validateLogin, loginAdmin);

// Change Password
router.put(
  '/change-password',
  protect,
  validateChangePassword,
  changePassword
);

// Only superadmin can create admins
router.post(
  '/register',
  protect,
  authorize('superadmin'),
  validateRegisterAdmin,
  registerAdmin
);

module.exports = router;