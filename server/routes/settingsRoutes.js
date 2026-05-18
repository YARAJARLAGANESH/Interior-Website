const express = require('express');
const { getSettings, updateSettings } = require('../controllers/settingsController.js');
const { protect } = require('../middleware/auth.js');

const router = express.Router();

// Public route - get settings
router.get('/', getSettings);

// Protected route - update settings
router.put('/', protect, updateSettings);

module.exports = router;
