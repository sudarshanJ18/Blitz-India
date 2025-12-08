import api from '../lib/api';

// Admin: Get home content
export const getHomeContent = async () => {
    const response = await api.get('/api/admin/content/home');
    return response.data;
};

// Admin: Update home content
export const updateHomeContent = async (contentData) => {
    const response = await api.put('/api/admin/content/home', contentData);
    return response.data;
};

// Public: Get home content
export const getPublicHomeContent = async () => {
    const response = await api.get('/api/home');
    return response.data;
};

// Admin: Get about content
export const getAboutContent = async () => {
    const response = await api.get('/api/admin/content/about');
    return response.data;
};

// Admin: Update about content
export const updateAboutContent = async (contentData) => {
    const response = await api.put('/api/admin/content/about', contentData);
    return response.data;
};

// Public: Get about content
export const getPublicAboutContent = async () => {
    const response = await api.get('/api/about');
    return response.data;
};

// Get legal content (privacy/terms)
export const getLegalContent = async () => {
    try {
        const [privacyRes, termsRes] = await Promise.allSettled([
            api.get('/api/legal/privacy'),
            api.get('/api/legal/terms')
        ]);

        return {
            privacyPolicy: privacyRes.status === 'fulfilled' ? privacyRes.value.data?.content || '' : '',
            termsOfService: termsRes.status === 'fulfilled' ? termsRes.value.data?.content || '' : ''
        };
    } catch (error) {
        // Error already handled by global interceptor
        return { privacyPolicy: '', termsOfService: '' };
    }
};

// Update legal content (privacy/terms)
export const updateLegalContent = async (contentData) => {
    const promises = [];
    if (contentData.privacyPolicy !== undefined) {
        promises.push(api.put('/api/admin/content/legal/privacy', { content: contentData.privacyPolicy }));
    }
    if (contentData.termsOfService !== undefined) {
        promises.push(api.put('/api/admin/content/legal/terms', { content: contentData.termsOfService }));
    }
    await Promise.all(promises);
    return { success: true };
};
