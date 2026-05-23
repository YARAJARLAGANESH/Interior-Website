const express = require('express');

const {
  loginAdmin,
  registerAdmin
} = require('../controllers/authController.js');

const {
  protect,
  authorize
} = require('../middleware/auth');

const router = express.Router();

// Admin Login
router.post('/login', loginAdmin);

// Only superadmin can create new admins
router.post(
  '/register',
  protect,
  authorize('superadmin'),
  registerAdmin
);

module.exports = router;