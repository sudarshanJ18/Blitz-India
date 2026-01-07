import api from '../lib/api';


export const getAllTestimonials = async (filters = {}) => {
    const params = new URLSearchParams();

    
    if (filters.featured !== undefined) {
        params.append('featured', filters.featured);
    }
    if (filters.published !== undefined) {
        params.append('published', filters.published);
    }

    const queryString = params.toString();
    const url = queryString ? `/api/testimonials?${queryString}` : '/api/testimonials';

    const response = await api.get(url);
    return response.data.data;
};


export const getAdminTestimonials = async () => {
    const response = await api.get('/api/testimonials/admin');
    return response.data.data;
};


export const getTestimonialById = async (id) => {
    const response = await api.get(`/api/testimonials/admin/${id}`);
    return response.data.data;
};


export const createTestimonial = async (testimonialData) => {
    const response = await api.post('/api/testimonials/admin', testimonialData);
    return response.data.data;
};


export const updateTestimonial = async (id, testimonialData) => {
    const response = await api.put(`/api/testimonials/admin/${id}`, testimonialData);
    return response.data.data;
};


export const deleteTestimonial = async (id) => {
    const response = await api.delete(`/api/testimonials/admin/${id}`);
    return response.data;
};
