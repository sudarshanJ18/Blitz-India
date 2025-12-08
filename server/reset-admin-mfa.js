const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

async function resetAdmin() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const email = 'verify@blitz.com';
        await Admin.deleteOne({ email });

        const admin = await Admin.create({
            name: 'Verify Admin',
            email: email,
            password: 'password123',
            role: 'admin',
            totpEnabled: false
        });

        console.log('Admin reset:', admin.email);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

resetAdmin();
