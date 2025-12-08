const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@blitzindia.com';
const ADMIN_PASS = 'Admin@123';

const runTest = async () => {
    try {
        console.log('=== Testing Blog Creation Success ===\n');

        // 1. Login
        console.log('1. Logging in...');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
        });
        const loginData = await loginRes.json();

        if (!loginData.success) {
            throw new Error(`Login failed: ${loginData.message}`);
        }
        const token = loginData.token;
        console.log('✓ Login successful\n');

        // 2. Create VALID blog
        console.log('2. Attempting to create VALID blog...');
        const validBlog = {
            title: "Valid Test Blog",
            summary: "This is a valid summary.",
            content: "<p>This is valid content.</p>",
            category: "Engineering",
            published: true
        };

        const createRes = await fetch(`${BASE_URL}/admin/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(validBlog)
        });

        const createData = await createRes.json();

        console.log(`Status Code: ${createRes.status}`);

        if (createRes.status === 201) {
            console.log('\n✓ SUCCESS: Blog created successfully.');
            console.log('Blog ID:', createData.data._id);

            // Cleanup: Delete the test blog
            console.log('\n3. Cleaning up (Deleting test blog)...');
            await fetch(`${BASE_URL}/admin/blogs/${createData.data._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            console.log('✓ Cleanup complete');
        } else {
            console.log('\n❌ FAILED: Server returned', createRes.status);
            console.log('Response:', JSON.stringify(createData, null, 2));
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
};

runTest();
