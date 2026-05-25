const Project = require('../models/Project');
const cloudinary = require('../config/cloudinary');
const mongoose = require('mongoose');

// -----------------------------
// Utility: Create Proper Error
// -----------------------------
const createError = (message, statusCode = 500) => {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
};

// -----------------------------
// Constants
// -----------------------------
const MAX_TITLE_LENGTH = 100;
const MAX_DESCRIPTION_LENGTH = 1000;
const MAX_LOCATION_LENGTH = 100;
const ALLOWED_CATEGORIES = [
  'residential',
  'commercial',
  'industrial',
  'renovation',
  'new-construction',
];

// -----------------------------
// Helper: Sanitize
// -----------------------------
const sanitizeString = (str, maxLength = null) => {
  if (typeof str !== 'string') return '';
  const trimmed = str.trim();
  return maxLength ? trimmed.substring(0, maxLength) : trimmed;
};

// -----------------------------
// GET ALL PROJECTS
// -----------------------------
exports.getAllProjects = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, category, search } = req.query;

    const query = {};

    if (category && ALLOWED_CATEGORIES.includes(category.toLowerCase())) {
      query.category = category.toLowerCase();
    }

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const projects = await Project.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Project.countDocuments(query);

    res.status(200).json({
      success: true,
      projects,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit)),
      },
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------
// GET PROJECT BY ID
// -----------------------------
exports.getProjectById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError('Invalid project ID format', 400));
    }

    const project = await Project.findById(id);

    if (!project) {
      return next(createError('Project not found', 404));
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------
// CREATE PROJECT
// -----------------------------
exports.createProject = async (req, res, next) => {
  try {
    const { title, description, category, location } = req.body;

    const sanitizedTitle = sanitizeString(title, MAX_TITLE_LENGTH);
    const sanitizedDescription = sanitizeString(
      description,
      MAX_DESCRIPTION_LENGTH
    );
    const sanitizedCategory = sanitizeString(category).toLowerCase();
    const sanitizedLocation = sanitizeString(
      location,
      MAX_LOCATION_LENGTH
    );

    if (!sanitizedTitle)
      return next(createError('Title is required', 400));

    if (!sanitizedCategory ||
        !ALLOWED_CATEGORIES.includes(sanitizedCategory))
      return next(createError('Invalid category', 400));

    if (!sanitizedLocation)
      return next(createError('Location is required', 400));

    // Support multiple storage output fields (path, secure_url, url, location)
    const images =
      (req.files?.images || [])
        .map((file) => file.path || file.secure_url || file.url || file.location)
        .filter(Boolean);

    const video =
      (req.files?.video && req.files.video.length > 0)
        ? (req.files.video[0].path || req.files.video[0].secure_url || req.files.video[0].url || req.files.video[0].location)
        : null;

    const project = await Project.create({
      title: sanitizedTitle,
      description: sanitizedDescription,
      category: sanitizedCategory,
      location: sanitizedLocation,
      images,
      video,
    });

    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------
// UPDATE PROJECT
// -----------------------------
exports.updateProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError('Invalid project ID format', 400));
    }

    const project = await Project.findById(id);

    if (!project) {
      return next(createError('Project not found', 404));
    }

    const { title, description, category, location } = req.body;

    if (title !== undefined) {
      const val = sanitizeString(title, MAX_TITLE_LENGTH);
      if (!val) return next(createError('Title cannot be empty', 400));
      project.title = val;
    }

    if (description !== undefined) {
      project.description = sanitizeString(
        description,
        MAX_DESCRIPTION_LENGTH
      );
    }

    if (category !== undefined) {
      const val = sanitizeString(category).toLowerCase();
      if (!ALLOWED_CATEGORIES.includes(val))
        return next(createError('Invalid category', 400));
      project.category = val;
    }

    if (location !== undefined) {
      const val = sanitizeString(location, MAX_LOCATION_LENGTH);
      if (!val)
        return next(createError('Location cannot be empty', 400));
      project.location = val;
    }

    if (req.files?.images?.length > 0) {
      const newImages = req.files.images
        .map((file) => file.path || file.secure_url || file.url || file.location)
        .filter(Boolean);
      project.images = [...(project.images || []), ...newImages];
    }

    if (req.files?.video?.length > 0) {
      project.video = req.files.video[0].path || req.files.video[0].secure_url || req.files.video[0].url || req.files.video[0].location;
    }

    const updatedProject = await project.save();

    res.status(200).json({
      success: true,
      project: updatedProject,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------
// DELETE PROJECT
// -----------------------------
exports.deleteProject = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(createError('Invalid project ID format', 400));
    }

    const project = await Project.findById(id);

    if (!project) {
      return next(createError('Project not found', 404));
    }

    await Project.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};