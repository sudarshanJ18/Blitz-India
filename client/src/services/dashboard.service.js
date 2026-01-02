import api from '../lib/api';

// Get dashboard stats
export const getDashboardStats = async () => {
    const response = await api.get('/api/admin/dashboard/stats');
    return response.data;
};

// Get all messages
export const getMessages = async () => {
    const response = await api.get('/api/admin/messages');
    return response.data;
};

// Mark message as read
export const markMessageAsRead = async (id) => {
    const response = await api.put(`/api/admin/messages/${id}`, { status: 'read' });
    return response.data;
};

// Delete message
export const deleteMessage = async (id) => {
    const response = await api.delete(`/api/admin/messages/${id}`);
    return response.data;
};
