require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/auth.routes');
const passwordResetRoutes = require('./routes/auth/password-reset.routes');
const homeRoutes = require('./routes/public/home.routes');
const aboutRoutes = require('./routes/public/about.routes');
const servicesRoutes = require('./routes/public/services.routes');
const portfolioRoutes = require('./routes/public/portfolio.routes');
const blogsRoutes = require('./routes/public/blogs.routes');
const contactRoutes = require('./routes/public/contact.routes');
const legalRoutes = require('./routes/public/legal.routes');
const settingsRoutes = require('./routes/public/settings.routes');
const testimonialsRoutes = require('./routes/testimonials.routes');
const sitemapRoutes = require('./routes/sitemap.routes');

// Admin routes
const adminContentRoutes = require('./routes/admin/content.routes');
const adminServicesRoutes = require('./routes/admin/services.routes');
const adminProjectsRoutes = require('./routes/admin/projects.routes');
const adminBlogsRoutes = require('./routes/admin/blogs.routes');
const adminContactRoutes = require('./routes/admin/contact.routes');
const adminSettingsRoutes = require('./routes/admin/settings.routes');
const adminDashboardRoutes = require('./routes/admin/dashboard.routes');

// Initialize Express app
const app = express();

// Connect to MongoDB
connectDB();

// HTTPS redirect in production
const { httpsRedirect, helmetConfig } = require('./middleware/security');
app.use(httpsRedirect);

// Security middleware - Enhanced configuration
app.use(helmet(helmetConfig));

// Compression middleware for better performance
const compression = require('compression');
app.use(compression({
    filter: (req, res) => {
        if (req.headers['x-no-compression']) {
            return false;
        }
        return compression.filter(req, res);
    },
    level: 6
}));

// CORS configuration - Support both development and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.CLIENT_URL,  // Production frontend URL
    process.env.CORS_ORIGIN
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl, or Postman)
        if (!origin) return callback(null, true);

        // In production, strictly check against allowed origins
        if (process.env.NODE_ENV === 'production') {
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                logger.warn(`CORS blocked request from origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            // In development, allow all origins
            callback(null, true);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// NoSQL injection protection
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
        logger.warn(`NoSQL injection attempt detected: ${key}`, {
            ip: req.ip,
            path: req.path
        });
    }
}));

// XSS protection
const xss = require('xss-clean');
app.use(xss());

// Request logging middleware (only in development)
if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        logger.debug(`${req.method} ${req.path}`, {
            query: req.query,
            ip: req.ip
        });
        next();
    });
}

// Public routes
app.use('/api/auth', authRoutes);
app.use('/api/auth', passwordResetRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/legal', legalRoutes);
app.use('/api/settings', settingsRoutes);

// SEO routes
app.use('/', sitemapRoutes);


// Admin routes (all require authentication) - MUST come before catchall routes
app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/services', adminServicesRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/blogs', adminBlogsRoutes);
app.use('/api/admin/contact', adminContactRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/upload', require('./routes/admin/upload.routes'));

// Testimonials routes - comes AFTER admin routes to avoid conflicts
app.use('/api/testimonials', testimonialsRoutes);

// Serve uploads directory statically with caching
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1y', // Cache for 1 year
    immutable: true,
    etag: true
}));

// 404 handler for undefined routes
app.use(notFound);

// Global error handler (must be last)
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    // Close server & exit process
    server.close(() => process.exit(1));
});

// Handle SIGTERM
process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Process terminated');
    });
});

module.exports = app;
