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
const {
  validateCreateProject,
  validateUpdateProject,
} = require('../middleware/validators');

const router = express.Router();

// Public routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);

// Protected routes (Admin only)
router.post('/', protect, upload, validateCreateProject, createProject);
router.put('/:id', protect, upload, validateUpdateProject, updateProject);
router.delete('/:id', protect, deleteProject);

module.exports = router;
