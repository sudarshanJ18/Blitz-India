import React, { useState, useEffect } from 'react';
import { getHomeContent, updateHomeContent } from '../../services/content.service';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const HomeManager = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        hero: {
            title: '',
            subtitle: '',
            ctaText: '',
            ctaLink: '',
            backgroundImage: ''
        },
        stats: []
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const data = await getHomeContent();
            if (data) {
                setFormData({
                    hero: data.hero || { title: '', subtitle: '', ctaText: '', ctaLink: '', backgroundImage: '' },
                    stats: Array.isArray(data.stats) ? data.stats : []
                });
            }
        } catch (error) {
            console.error('Error fetching home content:', error);
            if (error.response?.status !== 404) {
                toast.error('Failed to load home content');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleHeroChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            hero: { ...prev.hero, [name]: value }
        }));
    };

    const handleStatChange = (index, field, value) => {
        const newStats = [...formData.stats];
        newStats[index] = { ...newStats[index], [field]: value };
        setFormData(prev => ({ ...prev, stats: newStats }));
    };

    const addStat = () => {
        setFormData(prev => ({
            ...prev,
            stats: [...prev.stats, { label: '', value: '' }]
        }));
    };

    const removeStat = (index) => {
        setFormData(prev => ({
            ...prev,
            stats: prev.stats.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateHomeContent(formData);
            toast.success('Home page content updated');
        } catch (error) {
            console.error('Error updating home content:', error);
            toast.error('Failed to update content');
        }
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Home Page Manager</h1>
                    <p className="text-gray-600 mt-1">Manage hero section and key statistics.</p>
                </div>
                <button
                    onClick={handleSubmit}
                    className="bg-orange-600 text-white px-6 py-2 rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    <span>Save Changes</span>
                </button>
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Hero Section</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Main Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.hero.title}
                            onChange={handleHeroChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g. Building the Future"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle</label>
                        <textarea
                            name="subtitle"
                            value={formData.hero.subtitle}
                            onChange={handleHeroChange}
                            rows="3"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="e.g. We provide innovative solutions..."
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Button Text</label>
                            <input
                                type="text"
                                name="ctaText"
                                value={formData.hero.ctaText}
                                onChange={handleHeroChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="e.g. Get Started"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">CTA Link</label>
                            <input
                                type="text"
                                name="ctaLink"
                                value={formData.hero.ctaLink}
                                onChange={handleHeroChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="e.g. /contact"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL</label>
                        <input
                            type="text"
                            name="backgroundImage"
                            value={formData.hero.backgroundImage}
                            onChange={handleHeroChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                        />
                    </div>
                </div>
            </div>

            
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Key Statistics</h2>
                    <button
                        type="button"
                        onClick={addStat}
                        className="text-orange-600 hover:text-orange-700 font-medium text-sm flex items-center"
                    >
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        Add Stat
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {formData.stats.map((stat, index) => (
                        <div key={index} className="p-4 bg-gray-50 rounded-xl border border-gray-200 relative group">
                            <button
                                type="button"
                                onClick={() => removeStat(index)}
                                className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                            <div className="space-y-3">
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Value</label>
                                    <input
                                        type="text"
                                        value={stat.value}
                                        onChange={(e) => handleStatChange(index, 'value', e.target.value)}
                                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="e.g. 150+"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-500 mb-1">Label</label>
                                    <input
                                        type="text"
                                        value={stat.label}
                                        onChange={(e) => handleStatChange(index, 'label', e.target.value)}
                                        className="w-full px-3 py-1 border border-gray-300 rounded focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                                        placeholder="e.g. Happy Clients"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                    {formData.stats.length === 0 && (
                        <p className="text-gray-500 text-sm col-span-2 text-center py-4">No stats added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeManager;
