import axios from 'axios';

/**
 * Consolidated API configuration for the entire application
 * Handles authentication, error responses, and request/response interceptors
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, // Important for cookies
    timeout: 10000, // 10 second timeout
});

/**
 * Request interceptor - Attach authentication token to all requests
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response interceptor - Handle errors globally
 */
api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized - Token expired or invalid
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            // Only redirect if not already on login page
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/admin/login';
            }
        }

        // Handle 403 Forbidden - Insufficient permissions
        if (error.response?.status === 403) {
            console.error('Access denied: Admin privileges required');
        }

        // Handle 429 Too Many Requests
        if (error.response?.status === 429) {
            console.error('Too many requests. Please slow down.');
        }

        return Promise.reject(error);
    }
);

export default api;