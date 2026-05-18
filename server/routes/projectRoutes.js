const express = require('express');
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require('../controllers/projectController.js');
const { protect } = require('../middleware/auth.js');
const upload = require('../middleware/upload.js');

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', protect, upload, createProject);
router.put('/:id', protect, upload, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
