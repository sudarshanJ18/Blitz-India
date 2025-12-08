import api from '../lib/api';

// Login with email and password (step 1)
export const login = async (email, password) => {
    const response = await api.post('/api/auth/login', {
        email,
        password
    });
    // Store token and admin data
    if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
    }
    if (response.data.admin) {
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
};

// Verify TOTP during login (step 2)
export const verifyLoginMfa = async (mfaToken, totpCode, backupCode) => {
    const response = await api.post('/api/auth/verify-login-mfa', {
        mfaToken,
        totpCode,
        backupCode
    });
    // Store token and admin data after MFA verification
    if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
    }
    if (response.data.admin) {
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
};

// Get current authenticated user
export const getCurrentUser = async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
};

// Setup TOTP MFA - Get QR code
export const setupMFA = async () => {
    const response = await api.post('/api/auth/setup-mfa');
    return response.data;
};

// Verify TOTP setup and enable MFA
export const verifyMFASetup = async (totpCode) => {
    const response = await api.post('/api/auth/verify-mfa-setup', {
        totpCode,
    });
    return response.data;
};

// Disable MFA
export const disableMFA = async (password) => {
    const response = await api.post('/api/auth/disable-mfa', {
        password,
    });
    return response.data;
};

// Create admin user (should be disabled in production)
export const createAdmin = async (name, email, password) => {
    const response = await api.post('/api/auth/create-admin', {
        name,
        email,
        password,
    });
    return response.data;
};

// Logout helper
export const logout = async () => {
    try {
        await api.get('/api/auth/logout');
    } catch (error) {
        // Error already handled by global interceptor
    } finally {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        // Force reload or redirect to ensure state is cleared
        window.location.href = '/admin/login';
    }
};

// Store auth data
export const storeAuthData = (token, userData) => {
    if (token) {
        localStorage.setItem('adminToken', token);
    }
    if (userData) {
        localStorage.setItem('adminUser', JSON.stringify(userData));
    }
};

// Check if user is authenticated
export const isAuthenticated = () => {
    // Check for both token and user data
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    return !!(token && userStr);
};

// Get stored user data
export const getStoredUser = () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
};
