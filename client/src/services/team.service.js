import api from '../lib/api';


export const getAllTeamMembers = async () => {
    const response = await api.get('/api/admin/team');
    return response.data;
};


export const createTeamMember = async (memberData) => {
    const response = await api.post('/api/admin/team', memberData);
    return response.data;
};


export const updateTeamMember = async (id, memberData) => {
    const response = await api.put(`/api/admin/team/${id}`, memberData);
    return response.data;
};


export const deleteTeamMember = async (id) => {
    const response = await api.delete(`/api/admin/team/${id}`);
    return response.data;
};
