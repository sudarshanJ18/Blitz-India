const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const newUri = 'mongodb+srv://jsudarshanreddy2003_db_user:e44h8PhdrGtvrfaP@blitzindia.m9ncxdb.mongodb.net/blitz_india';

try {
    let envContent = fs.readFileSync(envPath, 'utf8');

    if (envContent.includes('MONGODB_URI=')) {
        envContent = envContent.replace(/MONGODB_URI=.+/, `MONGODB_URI=${newUri}`);
    } else {
        envContent += `\nMONGODB_URI=${newUri}`;
    }

    fs.writeFileSync(envPath, envContent);
    console.log('Successfully updated MONGODB_URI in .env');
} catch (error) {
    console.error('Error updating .env:', error);
}
