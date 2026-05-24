const express = require('express');

const {
  getCurrentAdmin,
  getAdmins,
  deleteAdmin,
} = require('../controllers/adminController');

const {
  protect,
  authorize,
} = require('../middleware/auth');

const router = express.Router();

// Current logged-in admin
router.get(
  '/me',
  protect,
  getCurrentAdmin
);

// Get all admins
router.get(
  '/',
  protect,
  authorize('superadmin'),
  getAdmins
);

// Delete admin
router.delete(
  '/:id',
  protect,
  authorize('superadmin'),
  deleteAdmin
);

module.exports = router;