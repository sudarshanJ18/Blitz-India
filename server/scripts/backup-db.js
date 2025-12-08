const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const logger = require('../utils/logger');

/**
 * Automated Database Backup Script
 * Creates compressed MongoDB backups with timestamps
 */

// Configuration
const backupDir = path.join(__dirname, '../backups');
const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
const timeStamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupFile = path.join(backupDir, `backup-${timeStamp}.gz`);

// Ensure backup directory exists
if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir, { recursive: true });
    logger.info('Created backup directory:', backupDir);
}

const performBackup = () => {
    const mongoUri = process.env.MONGODB_URI;

    if (!mongoUri) {
        logger.error('MONGODB_URI not found in environment variables');
        process.exit(1);
    }

    // Extract database name from URI
    const dbName = mongoUri.split('/').pop().split('?')[0];

    logger.info('Starting database backup...');
    logger.info('Database:', dbName);
    logger.info('Backup file:', backupFile);

    // Execute mongodump command
    const command = `mongodump --uri="${mongoUri}" --archive="${backupFile}" --gzip`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            logger.error('Backup failed:', error.message);
            console.error('Error:', error.message);
            process.exit(1);
        }

        if (stderr) {
            logger.warn('Backup stderr:', stderr);
        }

        logger.info('Backup completed successfully');
        console.log('✅ Backup completed:', backupFile);

        // Get file size
        const stats = fs.statSync(backupFile);
        const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
        logger.info(`Backup size: ${fileSizeMB} MB`);
        console.log(`Size: ${fileSizeMB} MB`);

        // Clean up old backups (keep last 7 days)
        cleanupOldBackups();
    });
};

/**
 * Remove backups older than 7 days
 */
const cleanupOldBackups = () => {
    const files = fs.readdirSync(backupDir);
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

    files.forEach(file => {
        const filePath = path.join(backupDir, file);
        const stats = fs.statSync(filePath);
        const age = now - stats.mtimeMs;

        if (age > maxAge) {
            fs.unlinkSync(filePath);
            logger.info('Removed old backup:', file);
            console.log('🗑️  Removed old backup:', file);
        }
    });
};

// Run backup
performBackup();

module.exports = { performBackup, cleanupOldBackups };
