const mongoose = require('mongoose');
const logger = require('../utils/logger');

const connectDB = async (retryCount = 0, maxRetries = 3) => {
    try {
        logger.info(`Attempting to connect to MongoDB (attempt ${retryCount + 1}/${maxRetries + 1})...`);
        
        const options = {
            serverSelectionTimeoutMS: 10000, // Increased timeout
            socketTimeoutMS: 45000,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        const conn = await mongoose.connect(process.env.MONGODB_URI, options);

        logger.info(`MongoDB Connected: ${conn.connection.host}`);

        // Connection event listeners
        mongoose.connection.on('error', (err) => {
            logger.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            logger.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            logger.info('MongoDB reconnected');
        });

        // Graceful shutdown
        process.on('SIGINT', async () => {
            await mongoose.connection.close();
            logger.info('MongoDB connection closed through app termination');
            process.exit(0);
        });

    } catch (error) {
        logger.error('MongoDB connection failed:', error.message);
        
        if (retryCount < maxRetries) {
            logger.info(`Retrying connection in 5 seconds... (${retryCount + 1}/${maxRetries})`);
            setTimeout(() => {
                connectDB(retryCount + 1, maxRetries);
            }, 5000);
        } else {
            logger.error('Maximum retry attempts reached. Exiting...');
            logger.error('Please check your network connection and ensure your IP is whitelisted in MongoDB Atlas.');
            logger.error('Also verify that the MONGODB_URI in your .env file is correct.');
            logger.error('Common solutions:');
            logger.error('1. Check your internet connection');
            logger.error('2. Verify MongoDB Atlas cluster is running');
            logger.error('3. Ensure your IP address is whitelisted in MongoDB Atlas Network Access settings');
            logger.error('4. Check if the username and password in the connection string are correct');
            process.exit(1);
        }
    }
};

module.exports = connectDB;
