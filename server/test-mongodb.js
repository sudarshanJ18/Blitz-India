require('dotenv').config();
const mongoose = require('mongoose');

console.log('Testing MongoDB connection...');
console.log('MongoDB URI:', process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 5000
})
    .then(() => {
        console.log('✓ MongoDB connected successfully!');
        console.log('Connection host:', mongoose.connection.host);
        process.exit(0);
    })
    .catch((err) => {
        console.error('✗ MongoDB connection failed:');
        console.error('Error:', err.message);
        console.error('\nPossible issues:');
        console.error('1. MongoDB is not running. Start it with: mongod');
        console.error('2. Connection string is incorrect');
        console.error('3. MongoDB is running on a different port');
        process.exit(1);
    });
