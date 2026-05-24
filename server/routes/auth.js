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

const router = express.Router();

// Admin Login
router.post('/login', loginAdmin);

// Change Password
router.put(
  '/change-password',
  protect,
  changePassword
);

// Only superadmin can create admins
router.post(
  '/register',
  protect,
  authorize('superadmin'),
  registerAdmin
);

module.exports = router;