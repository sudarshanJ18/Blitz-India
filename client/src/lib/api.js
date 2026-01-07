import axios from 'axios';


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true, 
    timeout: 10000, 
});


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


api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            localStorage.removeItem('adminUser');

            
            if (!window.location.pathname.includes('/login')) {
                window.location.href = '/admin/login';
            }
        }

        
        if (error.response?.status === 403) {
            console.error('Access denied: Admin privileges required');
        }

        
        if (error.response?.status === 429) {
            console.error('Too many requests. Please slow down.');
        }

        return Promise.reject(error);
    }
);

export default api;