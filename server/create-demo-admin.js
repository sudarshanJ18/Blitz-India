const createDemoAdmin = async () => {
    try {
        const response = await fetch('http://localhost:5000/api/auth/create-admin', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: 'Demo Admin',
                email: 'admin@demo.com',
                password: 'Password123!'
            })
        });
        const data = await response.json();
        console.log('Admin created:', data);
    } catch (error) {
        console.log('Error creating admin:', error.message);
    }
};

createDemoAdmin();
