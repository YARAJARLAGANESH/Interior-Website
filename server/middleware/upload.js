const multer = require('multer');
const cloudinary = require('../config/cloudinary.js');

// Use memory storage — we'll upload to Cloudinary manually
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  const allowedImageMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
  const allowedVideoMimes = ['video/mp4', 'video/mpeg', 'video/webm', 'video/quicktime'];

  if (allowedImageMimes.includes(file.mimetype) || allowedVideoMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error('Invalid file type');
    error.statusCode = 400;
    cb(error);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 50 * 1024 * 1024 },
}).fields([
  { name: 'images', maxCount: 10 },
  { name: 'video', maxCount: 1 },
]);

// Helper: upload a single buffer to Cloudinary
const uploadToCloudinary = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
    stream.end(buffer);
  });
};

// Middleware: multer parse + Cloudinary upload
const uploadMiddleware = (req, res, next) => {
  upload(req, res, async (err) => {
    if (err) return next(err);

    try {
      // Upload images
      if (req.files?.images?.length > 0) {
        const uploaded = await Promise.all(
          req.files.images.map((file) =>
            uploadToCloudinary(file.buffer, {
              folder: 'interior/projects/images',
              resource_type: 'image',
              quality: 'auto',
            })
          )
        );
        // Attach secure_url as path so projectController works unchanged
        req.files.images = uploaded.map((r) => ({ path: r.secure_url }));
      }

      // Upload video
      if (req.files?.video?.length > 0) {
        const result = await uploadToCloudinary(req.files.video[0].buffer, {
          folder: 'interior/projects/videos',
          resource_type: 'video',
          quality: 'auto',
        });
        req.files.video = [{ path: result.secure_url }];
      }

      next();
    } catch (uploadError) {
      console.error('Cloudinary upload error:', uploadError.message);
      return res.status(500).json({ success: false, message: 'File upload failed' });
    }
  });
};

module.exports = uploadMiddleware;