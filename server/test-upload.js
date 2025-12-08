const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

const BASE_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@blitzindia.com';
const ADMIN_PASS = 'Admin@123';

const runTest = async () => {
    try {
        console.log('=== Testing Image Upload ===\n');

        // 1. Login
        console.log('1. Logging in...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
        });
        const loginData = await loginRes.json();
        if (!loginData.success) throw new Error('Login failed');
        const token = loginData.token;
        console.log('✓ Login successful');

        // 2. Create a dummy image file
        const dummyImagePath = path.join(__dirname, 'test-image.txt');
        fs.writeFileSync(dummyImagePath, 'This is a fake image content for testing');
        console.log('✓ Created dummy file');

        // 3. Upload File
        console.log('2. Uploading file...');
        const form = new FormData();
        // Note: The backend checks for image extension/mime. 
        // We need to fake it or use a real image. 
        // Let's try to upload this file but name it .jpg
        form.append('file', fs.createReadStream(dummyImagePath), {
            filename: 'test-image.jpg',
            contentType: 'image/jpeg'
        });

        const uploadRes = await fetch(`${BASE_URL}/admin/upload`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: form
        });

        const uploadData = await uploadRes.json();

        // Cleanup dummy file
        fs.unlinkSync(dummyImagePath);

        if (!uploadData.success) {
            console.log('Response:', uploadData);
            throw new Error(`Upload failed: ${uploadData.message}`);
        }

        console.log('✓ Upload successful');
        console.log('URL:', uploadData.url);

        console.log('\n=== Image Upload Verified ===');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
};

runTest();
