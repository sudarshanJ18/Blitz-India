import api from '../lib/api';

// Get all blogs (Public)
export const getAllBlogs = async (params) => {
    const response = await api.get('/api/blogs', { params });
    return response.data.data; // Extract the data array from the response
};

// Get blog by slug (Public)
export const getBlogBySlug = async (slug) => {
    const response = await api.get(`/api/blogs/${slug}`);
    return response.data.data; // Extract the blog object from the response
};


// Get all blogs (Admin)
export const getAdminBlogs = async () => {
    const response = await api.get('/api/admin/blogs');
    return response.data.data; // Extract the data array from the response
};

// Get blog by ID (Admin)
export const getBlogById = async (id) => {
    const response = await api.get(`/api/admin/blogs/${id}`);
    return response.data.data; // Extract the blog object from the response
};

// Create new blog
export const createBlog = async (blogData) => {
    const response = await api.post('/api/admin/blogs', blogData);
    return response.data;
};

// Update blog
export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/api/admin/blogs/${id}`, blogData);
    return response.data;
};

// Delete blog
export const deleteBlog = async (id) => {
    const response = await api.delete(`/api/admin/blogs/${id}`);
    return response.data;
};

// Default export with all functions
const blogsService = {
    getAllBlogs,
    getBlogBySlug,
    getAdminBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};

export default blogsService;
