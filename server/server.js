const dotenv = require('dotenv');
// Load environment variables as early as possible
dotenv.config();

const express = require('express');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xssClean = require('xss-clean');
const hpp = require('hpp');
const cors = require('cors');
const { rateLimit } = require('express-rate-limit');

// Route files
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projectRoutes');
const settingsRoutes = require('./routes/settingsRoutes');

// Middleware files
const { errorHandler } = require('./middleware/errorHandler');

// Validate required environment variables
const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingEnvVars.length > 0) {
  console.error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
  process.exit(1);
}

// Connect to MongoDB
const connectDB = require('./config/database');
connectDB();

const app = express();

// Security middleware
app.use(helmet()); // Set HTTP headers for security
app.use(mongoSanitize()); // Prevent MongoDB operator injection
app.use(xssClean()); // Prevent XSS attacks

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// Body parser with size limit
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// CORS configuration - restricted to specific origins
app.use(
  cors({
    origin: ['http://localhost:5174', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ message: 'Server is running' });
});

// Global error handling middleware
app.use(errorHandler);

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Start server
const PORT = process.env.PORT || 5001; // Restored to 5001 as per user's last log
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
