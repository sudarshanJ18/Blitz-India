import api from '../lib/api';

// Get all testimonials (Public) with optional filters
export const getAllTestimonials = async (filters = {}) => {
    const params = new URLSearchParams();

    // Add filters if provided
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

// Get all testimonials (Admin)
export const getAdminTestimonials = async () => {
    const response = await api.get('/api/testimonials/admin');
    return response.data.data;
};

// Get testimonial by ID (Admin)
export const getTestimonialById = async (id) => {
    const response = await api.get(`/api/testimonials/admin/${id}`);
    return response.data.data;
};

// Create new testimonial
export const createTestimonial = async (testimonialData) => {
    const response = await api.post('/api/testimonials/admin', testimonialData);
    return response.data.data;
};

// Update testimonial
export const updateTestimonial = async (id, testimonialData) => {
    const response = await api.put(`/api/testimonials/admin/${id}`, testimonialData);
    return response.data.data;
};

// Delete testimonial
export const deleteTestimonial = async (id) => {
    const response = await api.delete(`/api/testimonials/admin/${id}`);
    return response.data;
};
