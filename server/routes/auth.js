const express = require('express');
const { loginAdmin, registerAdmin } = require('../controllers/authController.js');

const router = express.Router();

// Admin Login
router.post('/login', loginAdmin);

// Admin Registration
router.post('/register', registerAdmin);

module.exports = router;