import api from '../lib/api';


export const getAllServices = async () => {
    const response = await api.get('/api/admin/services');
    return response.data;
};


export const getPublicServices = async () => {
    const response = await api.get('/api/services');
    return response.data;
};


export const getServiceById = async (id) => {
    const response = await api.get(`/api/admin/services/${id}`);
    return response.data;
};


export const createService = async (serviceData) => {
    const response = await api.post('/api/admin/services', serviceData);
    return response.data;
};


export const updateService = async (id, serviceData) => {
    const response = await api.put(`/api/admin/services/${id}`, serviceData);
    return response.data;
};


export const deleteService = async (id) => {
    const response = await api.delete(`/api/admin/services/${id}`);
    return response.data;
};
