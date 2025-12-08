import api from '../lib/api';

// Get all team members
export const getAllTeamMembers = async () => {
    const response = await api.get('/api/admin/team');
    return response.data;
};

// Create new team member
export const createTeamMember = async (memberData) => {
    const response = await api.post('/api/admin/team', memberData);
    return response.data;
};

// Update team member
export const updateTeamMember = async (id, memberData) => {
    const response = await api.put(`/api/admin/team/${id}`, memberData);
    return response.data;
};

// Delete team member
export const deleteTeamMember = async (id) => {
    const response = await api.delete(`/api/admin/team/${id}`);
    return response.data;
};
