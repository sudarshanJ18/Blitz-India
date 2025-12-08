const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000/api';
let adminToken = '';
let submissionId = '';

// Login as admin
async function loginAdmin() {
    console.log('\n1. Logging in as Admin...');
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: 'admin@blitz.com',
                password: 'Admin123!'
            })
        });

        const data = await response.json();
        if (data.success) {
            adminToken = data.token;
            console.log('✅ Admin logged in successfully');
            return true;
        } else {
            console.error('❌ Admin login failed:', data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ Login error:', error.message);
        return false;
    }
}

// Get all submissions
async function getSubmissions() {
    console.log('\n2. Fetching all contact submissions...');
    try {
        const response = await fetch(`${BASE_URL}/admin/contact/submissions`, {
            headers: { 'Authorization': `Bearer ${adminToken}` }
        });

        const data = await response.json();
        if (data.success) {
            console.log(`✅ Fetched ${data.count} submissions`);
            if (data.data.length > 0) {
                submissionId = data.data[0]._id;
                console.log('   Target Submission ID:', submissionId);
                console.log('   Current Status:', data.data[0].status);
            }
            return true;
        } else {
            console.error('❌ Fetch failed:', data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ Fetch error:', error.message);
        return false;
    }
}

// Update submission status
async function updateStatus() {
    if (!submissionId) {
        console.log('⚠️ No submission ID to update');
        return false;
    }
    console.log(`\n3. Updating status for submission ${submissionId}...`);
    try {
        const response = await fetch(`${BASE_URL}/admin/contact/submissions/${submissionId}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${adminToken}`
            },
            body: JSON.stringify({ status: 'reviewed' })
        });

        const data = await response.json();
        if (data.success) {
            console.log('✅ Status updated successfully');
            console.log('   New Status:', data.data.status);
            return true;
        } else {
            console.error('❌ Update failed:', data.message);
            return false;
        }
    } catch (error) {
        console.error('❌ Update error:', error.message);
        return false;
    }
}

// Delete submission (Optional - maybe just verify it exists)
// For this test, we won't delete to preserve data, or we can delete if we created a dummy one.
// Let's just verify the update worked.

async function runTest() {
    if (await loginAdmin()) {
        if (await getSubmissions()) {
            await updateStatus();
        }
    }
}

runTest();
