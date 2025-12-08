import api from '../lib/api';

// Get all services (Admin)
export const getAllServices = async () => {
    const response = await api.get('/api/admin/services');
    return response.data;
};

// Get all services (Public)
export const getPublicServices = async () => {
    const response = await api.get('/api/services');
    return response.data;
};

// Get service by ID
export const getServiceById = async (id) => {
    const response = await api.get(`/api/admin/services/${id}`);
    return response.data;
};

// Create new service
export const createService = async (serviceData) => {
    const response = await api.post('/api/admin/services', serviceData);
    return response.data;
};

// Update service
export const updateService = async (id, serviceData) => {
    const response = await api.put(`/api/admin/services/${id}`, serviceData);
    return response.data;
};

// Delete service
export const deleteService = async (id) => {
    const response = await api.delete(`/api/admin/services/${id}`);
    return response.data;
};
