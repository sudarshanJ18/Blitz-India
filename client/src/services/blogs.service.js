import api from '../lib/api';


export const getAllBlogs = async (params) => {
    const response = await api.get('/api/blogs', { params });
    return response.data.data; 
};


export const getBlogBySlug = async (slug) => {
    const response = await api.get(`/api/blogs/${slug}`);
    return response.data.data; 
};



export const getAdminBlogs = async () => {
    const response = await api.get('/api/admin/blogs');
    return response.data.data; 
};


export const getBlogById = async (id) => {
    const response = await api.get(`/api/admin/blogs/${id}`);
    return response.data.data; 
};


export const createBlog = async (blogData) => {
    const response = await api.post('/api/admin/blogs', blogData);
    return response.data;
};


export const updateBlog = async (id, blogData) => {
    const response = await api.put(`/api/admin/blogs/${id}`, blogData);
    return response.data;
};


export const deleteBlog = async (id) => {
    const response = await api.delete(`/api/admin/blogs/${id}`);
    return response.data;
};


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
