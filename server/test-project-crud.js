const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';
const ADMIN_EMAIL = 'admin@blitzindia.com';
const ADMIN_PASS = 'Admin@123';

const runTest = async () => {
    try {
        console.log('=== Testing Projects CRUD ===\n');

        // 1. Login
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: ADMIN_EMAIL, password: ADMIN_PASS })
        });
        const loginData = await loginRes.json();
        if (!loginData.success) throw new Error('Login failed');
        const token = loginData.token;

        // 2. Create Project
        console.log('Creating Project...');
        const newProject = {
            title: "Test Project CRUD",
            shortDescription: "Short description",
            description: "Long description",
            category: "Factory Layout",
            client: "Test Client",
            results: ["Result 1", "Result 2"],
            published: true
        };

        const createRes = await fetch(`${BASE_URL}/admin/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newProject)
        });
        const createData = await createRes.json();

        if (!createData.success) throw new Error(`Create failed: ${createData.message}`);
        const projectId = createData.data._id;
        console.log('✓ Project created');

        // 3. Update Project
        console.log('Updating Project...');
        const updateRes = await fetch(`${BASE_URL}/admin/projects/${projectId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ title: "Updated Project Title" })
        });
        const updateData = await updateRes.json();
        if (!updateData.success) throw new Error('Update failed');
        console.log('✓ Project updated');

        // 4. Delete Project
        console.log('Deleting Project...');
        const deleteRes = await fetch(`${BASE_URL}/admin/projects/${projectId}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const deleteData = await deleteRes.json();
        if (!deleteData.success) throw new Error('Delete failed');
        console.log('✓ Project deleted');

        console.log('\n=== Projects CRUD Verified ===');

    } catch (error) {
        console.error('\n❌ Error:', error.message);
        process.exit(1);
    }
};

runTest();
