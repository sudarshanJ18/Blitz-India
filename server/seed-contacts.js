const mongoose = require('mongoose');
require('dotenv').config();
const ContactSubmission = require('./models/ContactSubmission');

const seedSubmissions = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('MongoDB connected');

        const dummyData = [
            {
                name: "John Doe",
                email: "john@example.com",
                service: "3d-modeling",
                message: "I need a 3D model for my new product prototype.",
                status: "new",
                consent: true,
                submittedAt: new Date()
            },
            {
                name: "Jane Smith",
                email: "jane@company.com",
                company: "Tech Corp",
                service: "fea-analysis",
                message: "Looking for FEA analysis on our chassis design.",
                status: "reviewed",
                consent: true,
                submittedAt: new Date(Date.now() - 86400000) // 1 day ago
            },
            {
                name: "Mike Johnson",
                email: "mike@startup.io",
                phone: "+1 555 0123",
                service: "prototype-development",
                message: "We need a rapid prototype for our investor pitch.",
                status: "resolved",
                consent: true,
                submittedAt: new Date(Date.now() - 172800000) // 2 days ago
            }
        ];

        await ContactSubmission.insertMany(dummyData);
        console.log('✓ Seeded 3 dummy contact submissions');

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

seedSubmissions();
