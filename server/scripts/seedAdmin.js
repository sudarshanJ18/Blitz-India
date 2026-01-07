require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const logger = require('../utils/logger');

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        const email = 'info@blitzindiaengineering.com';
        const password = 'OmSumAdmin7$%'; 
        const name = 'Admin User';

        
        const deleteResult = await Admin.deleteMany({ email: { $ne: email } });
        if (deleteResult.deletedCount > 0) {
            console.log(`Deleted ${deleteResult.deletedCount} old/other admin accounts.`);
        }

        
        let admin = await Admin.findOne({ email });
        if (admin) {
            console.log('Admin user already exists. Updating password...');
            admin.password = password;
            await admin.save();
            console.log('Admin password updated.');
        } else {
            console.log('Creating new admin user...');
            admin = await Admin.create({
                name,
                email,
                password,
                totpEnabled: false
            });
            console.log('Admin user created.');
        }

        console.log('Credentials:');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);

        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
