const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@blitzindia.com';
const ADMIN_PASS = 'Admin@123';

const runTest = async () => {
    try {
        console.log('=== Testing Blog Creation Error ===\n');

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

        // 2. Try to create blog with EMPTY content
        console.log('2. Attempting to create blog with empty content...');
        const invalidBlog = {
            title: "Test Blog Title",
            summary: "Test Summary",
            content: "", // EMPTY CONTENT - Should fail
            category: "Engineering",
            published: false
        };

        const createRes = await fetch(`${BASE_URL}/admin/blogs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(invalidBlog)
        });

        const createData = await createRes.json();

        console.log(`Status Code: ${createRes.status}`);
        console.log('Response:', JSON.stringify(createData, null, 2));

        if (createRes.status === 400) {
            console.log('\n✓ REPRODUCED: Server returned 400 Bad Request as expected for empty content.');
        } else {
            console.log('\n❌ FAILED TO REPRODUCE: Server did not return 400.');
        }

    } catch (error) {
        console.error('\n❌ Error:', error.message);
    }
};

runTest();
