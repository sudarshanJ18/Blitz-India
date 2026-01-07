import api from '../lib/api';


export const getSettings = async () => {
    const response = await api.get('/api/admin/settings');
    return response.data;
};


export const updateSettings = async (settingsData) => {
    const response = await api.put('/api/admin/settings', settingsData);
    return response.data;
};
