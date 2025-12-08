const fetch = require('node-fetch');
const { generateSecret, verifyToken } = require('./utils/totp');
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const BASE_URL = 'http://localhost:5000/api';
let cookie = '';

async function runTest() {
    try {
        // Connect to DB to clean up
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const testEmail = 'mfa-test@example.com';
        const testPassword = 'password123';

        // Cleanup
        await Admin.deleteOne({ email: testEmail });
        console.log('Cleaned up old test admin');

        // 1. Create Admin (using script logic or direct DB)
        const admin = await Admin.create({
            name: 'MFA Test',
            email: testEmail,
            password: testPassword,
            role: 'admin'
        });
        console.log('Created test admin');

        // 2. Login (First Time)
        console.log('\n--- Step 1: First Login ---');
        const loginRes = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: testPassword })
        });
        const loginData = await loginRes.json();
        console.log('Login Response:', loginData);

        if (!loginData.success) throw new Error('Login failed');
        if (loginData.mfaRequired) throw new Error('MFA should not be required yet');
        if (loginData.admin.totpEnabled) throw new Error('MFA should not be enabled yet');

        // Extract cookie
        const rawCookie = loginRes.headers.get('set-cookie');
        if (!rawCookie) throw new Error('No cookie set');
        cookie = rawCookie.split(';')[0];
        console.log('Cookie received:', cookie);

        // 3. Setup MFA
        console.log('\n--- Step 2: Setup MFA ---');
        const setupRes = await fetch(`${BASE_URL}/auth/setup-mfa`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            }
        });
        const setupData = await setupRes.json();
        console.log('Setup Response:', setupData);

        if (!setupData.success) throw new Error('Setup failed');
        const secret = setupData.secret;

        // 4. Verify MFA Setup
        console.log('\n--- Step 3: Verify MFA Setup ---');
        // Generate valid token
        const token = require('speakeasy').totp({
            secret: secret,
            encoding: 'base32'
        });

        const verifySetupRes = await fetch(`${BASE_URL}/auth/verify-mfa-setup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookie
            },
            body: JSON.stringify({ totpCode: token })
        });
        const verifySetupData = await verifySetupRes.json();
        console.log('Verify Setup Response:', verifySetupData);

        if (!verifySetupData.success) throw new Error('Verify setup failed');

        // 5. Logout
        console.log('\n--- Step 4: Logout ---');
        const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
            method: 'GET',
            headers: { 'Cookie': cookie }
        });
        const logoutData = await logoutRes.json();
        console.log('Logout Response:', logoutData);

        // Check if cookie is cleared (set to empty or past date)
        const logoutCookie = logoutRes.headers.get('set-cookie');
        console.log('Logout Cookie:', logoutCookie);

        // 6. Login Again (MFA Required)
        console.log('\n--- Step 5: Login Again ---');
        const login2Res = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: testEmail, password: testPassword })
        });
        const login2Data = await login2Res.json();
        console.log('Login 2 Response:', login2Data);

        if (!login2Data.mfaRequired) throw new Error('MFA should be required');
        const mfaToken = login2Data.mfaToken;

        // 7. Verify Login MFA
        console.log('\n--- Step 6: Verify Login MFA ---');
        const loginToken = require('speakeasy').totp({
            secret: secret,
            encoding: 'base32'
        });

        const verifyLoginRes = await fetch(`${BASE_URL}/auth/verify-login-mfa`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mfaToken, totpCode: loginToken })
        });
        const verifyLoginData = await verifyLoginRes.json();
        console.log('Verify Login Response:', verifyLoginData);

        if (!verifyLoginData.success) throw new Error('Verify login failed');
        if (!verifyLoginRes.headers.get('set-cookie')) throw new Error('No cookie set after MFA login');

        console.log('\nSUCCESS: All steps passed!');

    } catch (error) {
        console.error('TEST FAILED:', error);
    } finally {
        await mongoose.disconnect();
    }
}

runTest();
