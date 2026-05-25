const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController.js');
const { protect, authorize } = require('../middleware/auth.js');
const { validateUpdateSettings } = require('../middleware/validators');

const router = express.Router();

// Public route - get settings
router.get('/', getSettings);

// Protected route - update settings (superadmin only)
router.put('/', protect, authorize('superadmin'), validateUpdateSettings, updateSettings);

module.exports = router;
