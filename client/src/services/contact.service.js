import api from '../lib/api';

const API_URL = `/api/admin/contact`;

const contactService = {
    // Get all submissions with pagination and filtering
    getAllSubmissions: async (page = 1, limit = 20, status = '') => {
        try {
            let url = `${API_URL}/submissions?page=${page}&limit=${limit}`;
            if (status) url += `&status=${status}`;

            const response = await api.get(url);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Get single submission details
    getSubmissionById: async (id) => {
        try {
            const response = await api.get(`${API_URL}/submissions/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Update submission status
    updateStatus: async (id, status, notes) => {
        try {
            const response = await api.put(
                `${API_URL}/submissions/${id}/status`,
                { status, notes }
            );
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    // Delete submission
    deleteSubmission: async (id) => {
        try {
            const response = await api.delete(`${API_URL}/submissions/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};

export default contactService;
