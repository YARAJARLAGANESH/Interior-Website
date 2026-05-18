const mongoose = require('mongoose');

// Centralized error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log the raw error safely
  console.error("RAW ERROR:", err);

  // If err is not an instance of Error, convert it
  if (!(err instanceof Error)) {
    const message = err.message || (typeof err === 'object' ? JSON.stringify(err) : String(err));
    const newErr = new Error(message);
    if (typeof err === 'object') {
      Object.assign(newErr, err);
    }
    err = newErr;
  }

  const timestamp = new Date().toISOString();
  const isDevelopment = process.env.NODE_ENV === 'development';

  // Log the FULL error object
  console.error("===== FULL ERROR OBJECT =====");
  console.error(err);
  console.error("Stack:", err?.stack);
  console.error("Message:", err?.message);
  console.error("================================");

  // Determine status code
  const status = err.statusCode || err.status || 500;

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: messages,
      ...(isDevelopment && { details: err.errors })
    });
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      ...(isDevelopment && { details: err.message })
    });
  }

  // Multer file upload errors
  if (err.name === 'MulterError') {
    let message = 'File upload error';
    switch (err.code) {
      case 'LIMIT_FILE_SIZE':
        message = 'File size too large. Maximum size is 50MB.';
        break;
      case 'LIMIT_FILE_COUNT':
        message = 'Too many files uploaded';
        break;
      case 'LIMIT_UNEXPECTED_FILE':
        message = 'Unexpected file field';
        break;
      case 'LIMIT_FIELD_KEY':
        message = 'Field name too long';
        break;
      case 'LIMIT_FIELD_VALUE':
        message = 'Field value too long';
        break;
      case 'LIMIT_FIELD_COUNT':
        message = 'Too many fields';
        break;
    }
    return res.status(400).json({
      success: false,
      message,
      ...(isDevelopment && { details: err.message })
    });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Invalid token'
    });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expired'
    });
  }

  // MongoDB connection errors
  if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
    return res.status(503).json({
      success: false,
      message: 'Database connection error. Please try again later.'
    });
  }

  // Cloudinary errors
  if (err.http_code) {
    return res.status(err.http_code).json({
      success: false,
      message: 'File storage service error. Please try again later.'
    });
  }

  // Custom application errors (with status < 500)
  if (status < 500) {
    return res.status(status).json({
      success: false,
      message: err.message || 'Bad request'
    });
  }

  // Default server error
  const message = isDevelopment ? err.message : 'Internal server error';

  res.status(status).json({
    success: false,
    message,
    ...(isDevelopment && { stack: err.stack })
  });
};

// Async error wrapper for routes that don't use try-catch
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    // If err is not an instance of Error, convert it
    if (!(err instanceof Error)) {
      err = new Error(String(err));
    }
    next(err);
  });
};

// Create custom error
const createError = (message, status = 500) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

module.exports = {
  errorHandler,
  asyncHandler,
  createError
};