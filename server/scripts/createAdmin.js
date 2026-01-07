require('dotenv').config();
const readline = require('readline');
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const logger = require('../utils/logger');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const createAdminUser = async () => {
    try {
        
        await mongoose.connect(process.env.MONGODB_URI);
        logger.info('MongoDB connected');

        console.log('\n=== Create Admin User ===\n');

        
        const name = await question('Enter admin name: ');
        const email = await question('Enter admin email: ');
        const password = await question('Enter admin password (min 8 chars, must include uppercase, lowercase, and number): ');

        
        if (!name || !email || !password) {
            throw new Error('All fields are required');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }

        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
            throw new Error('Password must contain at least one uppercase letter, one lowercase letter, and one number');
        }

        
        const existingAdmin = await Admin.findOne({ email });
        if (existingAdmin) {
            throw new Error(`Admin with email ${email} already exists`);
        }

        
        const admin = await Admin.create({
            name,
            email,
            password,
            totpEnabled: false
        });

        console.log('\n✓ Admin user created successfully!');
        console.log(`\nAdmin Details:`);
        console.log(`Name: ${admin.name}`);
        console.log(`Email: ${admin.email}`);
        console.log(`ID: ${admin._id}`);
        console.log(`\nIMPORTANT: Please login and setup TOTP/MFA for enhanced security.`);
        console.log(`\nYou can now start the server and log in with these credentials.\n`);

        process.exit(0);
    } catch (error) {
        console.error('\n❌ Error creating admin user:', error.message);
        process.exit(1);
    } finally {
        rl.close();
    }
};

createAdminUser();
