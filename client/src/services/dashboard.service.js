import api from '../lib/api';


export const getDashboardStats = async () => {
    const response = await api.get('/api/admin/dashboard/stats');
    return response.data;
};


export const getMessages = async () => {
    const response = await api.get('/api/admin/messages');
    return response.data;
};


export const markMessageAsRead = async (id) => {
    const response = await api.put(`/api/admin/messages/${id}`, { status: 'read' });
    return response.data;
};


export const deleteMessage = async (id) => {
    const response = await api.delete(`/api/admin/messages/${id}`);
    return response.data;
};
