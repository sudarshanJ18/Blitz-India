require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const path = require('path');
const connectDB = require('./config/database');
const logger = require('./utils/logger');
const { errorHandler, notFound } = require('./middleware/errorHandler');


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


const adminContentRoutes = require('./routes/admin/content.routes');
const adminServicesRoutes = require('./routes/admin/services.routes');
const adminProjectsRoutes = require('./routes/admin/projects.routes');
const adminBlogsRoutes = require('./routes/admin/blogs.routes');
const adminContactRoutes = require('./routes/admin/contact.routes');
const adminSettingsRoutes = require('./routes/admin/settings.routes');
const adminDashboardRoutes = require('./routes/admin/dashboard.routes');


const app = express();


connectDB();


const { httpsRedirect, helmetConfig } = require('./middleware/security');
app.use(httpsRedirect);


app.use(helmet(helmetConfig));


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


const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    process.env.CLIENT_URL,  
    process.env.CORS_ORIGIN
].filter(Boolean);

const corsOptions = {
    origin: function (origin, callback) {
        
        if (!origin) return callback(null, true);

        
        if (process.env.NODE_ENV === 'production') {
            if (allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true);
            } else {
                logger.warn(`CORS blocked request from origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        } else {
            
            callback(null, true);
        }
    },
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};
app.use(cors(corsOptions));


app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: '10mb' }));


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


const xss = require('xss-clean');
app.use(xss());


if (process.env.NODE_ENV === 'development') {
    app.use((req, res, next) => {
        logger.debug(`${req.method} ${req.path}`, {
            query: req.query,
            ip: req.ip
        });
        next();
    });
}


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


app.use('/', sitemapRoutes);



app.use('/api/admin/content', adminContentRoutes);
app.use('/api/admin/services', adminServicesRoutes);
app.use('/api/admin/projects', adminProjectsRoutes);
app.use('/api/admin/blogs', adminBlogsRoutes);
app.use('/api/admin/contact', adminContactRoutes);
app.use('/api/admin/settings', adminSettingsRoutes);
app.use('/api/admin/dashboard', adminDashboardRoutes);
app.use('/api/admin/upload', require('./routes/admin/upload.routes'));


app.use('/api/testimonials', testimonialsRoutes);


app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    maxAge: '1y', 
    immutable: true,
    etag: true
}));


app.use(notFound);


app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
    logger.info(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});


process.on('unhandledRejection', (err) => {
    logger.error('Unhandled Promise Rejection:', err);
    
    server.close(() => process.exit(1));
});


process.on('SIGTERM', () => {
    logger.info('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
        logger.info('Process terminated');
    });
});

module.exports = app;
