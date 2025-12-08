require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        const email = 'admin@blitzindia.com';
        const password = 'Admin@123';

        // Check if exists
        const existing = await Admin.findOne({ email });
        if (existing) {
            console.log('Admin already exists. Updating password...');
            existing.password = password;
            await existing.save();
            console.log('Admin password updated.');
        } else {
            console.log('Creating new admin...');
            await Admin.create({
                name: 'Admin User',
                email,
                password,
                role: 'super-admin',
                totpEnabled: false
            });
            console.log('Admin created.');
        }

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

createAdmin();
