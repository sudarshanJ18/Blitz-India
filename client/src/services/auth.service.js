import api from '../lib/api';


export const login = async (email, password) => {
    const response = await api.post('/api/auth/login', {
        email,
        password
    });
    
    if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
    }
    if (response.data.admin) {
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
};


export const verifyLoginMfa = async (mfaToken, totpCode, backupCode) => {
    const response = await api.post('/api/auth/verify-login-mfa', {
        mfaToken,
        totpCode,
        backupCode
    });
    
    if (response.data.token) {
        localStorage.setItem('adminToken', response.data.token);
    }
    if (response.data.admin) {
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin));
    }
    return response.data;
};


export const getCurrentUser = async () => {
    const response = await api.get('/api/auth/me');
    return response.data;
};


export const setupMFA = async () => {
    const response = await api.post('/api/auth/setup-mfa');
    return response.data;
};


export const verifyMFASetup = async (totpCode) => {
    const response = await api.post('/api/auth/verify-mfa-setup', {
        totpCode,
    });
    return response.data;
};


export const disableMFA = async (password) => {
    const response = await api.post('/api/auth/disable-mfa', {
        password,
    });
    return response.data;
};


export const createAdmin = async (name, email, password) => {
    const response = await api.post('/api/auth/create-admin', {
        name,
        email,
        password,
    });
    return response.data;
};


export const logout = async () => {
    try {
        await api.get('/api/auth/logout');
    } catch (error) {
        console.error('Logout failed:', error);
    } finally {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        
        window.location.href = '/admin/login';
    }
};


export const storeAuthData = (token, userData) => {
    if (token) {
        localStorage.setItem('adminToken', token);
    }
    if (userData) {
        localStorage.setItem('adminUser', JSON.stringify(userData));
    }
};


export const isAuthenticated = () => {
    
    const token = localStorage.getItem('adminToken');
    const userStr = localStorage.getItem('adminUser');
    return !!(token && userStr);
};


export const getStoredUser = () => {
    const userStr = localStorage.getItem('adminUser');
    return userStr ? JSON.parse(userStr) : null;
};
