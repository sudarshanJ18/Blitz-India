import api from '../lib/api';


export const getAllProjects = async () => {
    const response = await api.get('/api/admin/projects');
    return response.data.data; 
};


export const getPublicProjects = async (category = null) => {
    const params = category && category !== 'all' ? { category } : {};
    const response = await api.get('/api/portfolio', { params });
    return response.data.data; 
};


export const getProjectById = async (id) => {
    const response = await api.get(`/api/admin/projects/${id}`);
    return response.data.data; 
};


export const getPublicProjectDetail = async (id) => {
    const response = await api.get(`/api/portfolio/${id}`);
    return response.data.data; 
};


export const createProject = async (projectData) => {
    const response = await api.post('/api/admin/projects', projectData);
    return response.data.data; 
};


export const updateProject = async (id, projectData) => {
    const response = await api.put(`/api/admin/projects/${id}`, projectData);
    return response.data.data; 
};


export const deleteProject = async (id) => {
    const response = await api.delete(`/api/admin/projects/${id}`);
    return response.data; 
};
