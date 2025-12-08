require('dotenv').config();
const mongoose = require('mongoose');
const ContactSubmission = require('./models/ContactSubmission');

const verifyDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log(`Connected to MongoDB: ${mongoose.connection.name}`);

        const contactCount = await ContactSubmission.countDocuments();
        console.log(`Contact Submissions: ${contactCount}`);

        const servicesCount = await mongoose.connection.db.collection('services').countDocuments();
        console.log(`Services: ${servicesCount}`);

        const projectsCount = await mongoose.connection.db.collection('projects').countDocuments();
        console.log(`Projects: ${projectsCount}`);

        const categoriesCount = await mongoose.connection.db.collection('servicecategories').countDocuments();
        console.log(`Service Categories: ${categoriesCount}`);

        const settingsCount = await mongoose.connection.db.collection('sitesettings').countDocuments();
        console.log(`Site Settings: ${settingsCount}`);

        process.exit(0);
    } catch (error) {
        console.error('DB Verification Failed:', error);
        process.exit(1);
    }
};

verifyDb();
