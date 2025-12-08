import api from '../lib/api';

// Get all projects (Admin)
export const getAllProjects = async () => {
    const response = await api.get('/api/admin/projects');
    return response.data.data; // Extract the data array
};

// Get all projects (Public)
export const getPublicProjects = async (category = null) => {
    const params = category && category !== 'all' ? { category } : {};
    const response = await api.get('/api/portfolio', { params });
    return response.data.data; // Extract the data array
};

// Get project by ID (Admin)
export const getProjectById = async (id) => {
    const response = await api.get(`/api/admin/projects/${id}`);
    return response.data.data; // Extract the project object
};

// Get project detail by ID (Public)
export const getPublicProjectDetail = async (id) => {
    const response = await api.get(`/api/portfolio/${id}`);
    return response.data.data; // Extract the project object
};

// Create new project
export const createProject = async (projectData) => {
    const response = await api.post('/api/admin/projects', projectData);
    return response.data.data; // Extract the created project
};

// Update project
export const updateProject = async (id, projectData) => {
    const response = await api.put(`/api/admin/projects/${id}`, projectData);
    return response.data.data; // Extract the updated project
};

// Delete project
export const deleteProject = async (id) => {
    const response = await api.delete(`/api/admin/projects/${id}`);
    return response.data; // Delete usually returns success message
};
