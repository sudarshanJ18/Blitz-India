// Simple test script to verify contact form API
const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');

async function testContactForm() {
    const formData = new FormData();
    formData.append('name', 'Test User');
    formData.append('email', 'test@example.com');
    formData.append('phone', '1234567890');
    formData.append('company', 'Test Company');
    formData.append('service', 'general-inquiry');
    formData.append('message', 'This is a test message to verify the contact form functionality works correctly.');
    formData.append('consent', 'true');

    try {
        const response = await fetch('http://localhost:5000/api/contact', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();

        console.log('Status:', response.status);
        console.log('Response:', JSON.stringify(result, null, 2));

        if (response.ok) {
            console.log('\n✅ SUCCESS: Contact form is working correctly!');
        } else {
            console.log('\n❌ ERROR: Contact form returned an error');
        }
    } catch (error) {
        console.error('❌ NETWORK ERROR:', error.message);
    }
}

testContactForm();
