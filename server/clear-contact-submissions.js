require('dotenv').config();
const mongoose = require('mongoose');
const ContactSubmission = require('./models/ContactSubmission');

const clearContactSubmissions = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Delete all contact submissions
        const result = await ContactSubmission.deleteMany({});
        console.log(`✅ Deleted ${result.deletedCount} contact submissions`);

        mongoose.connection.close();
        console.log('Database connection closed');
        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

clearContactSubmissions();
