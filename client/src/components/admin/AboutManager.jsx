import React, { useState, useEffect } from 'react';
import { getAboutContent, updateAboutContent } from '../../services/content.service';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const AboutManager = () => {
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        story: '',
        mission: '',
        vision: '',
        stats: []
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const data = await getAboutContent();
            if (data) {
                // Ensure stats is an array
                setFormData({
                    ...data,
                    stats: Array.isArray(data.stats) ? data.stats : []
                });
            }
        } catch (error) {
            console.error('Error fetching about content:', error);
            if (error.response?.status !== 404) {
                toast.error('Failed to load about content');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Stats Handlers
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
            await updateAboutContent(formData);
            toast.success('About page content updated');
        } catch (error) {
            console.error('Error updating about content:', error);
            toast.error('Failed to update content');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">About Page Manager</h1>
                    <p className="text-gray-600 mt-1">Manage company story, mission, and vision.</p>
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

            {/* Story Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-100">Company Story</h2>
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Our Story</label>
                        <textarea
                            name="story"
                            value={formData.story}
                            onChange={handleChange}
                            rows="6"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                            placeholder="Tell your company's story..."
                        ></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Mission Statement</label>
                            <textarea
                                name="mission"
                                value={formData.mission}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Our mission is..."
                            ></textarea>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Vision Statement</label>
                            <textarea
                                name="vision"
                                value={formData.vision}
                                onChange={handleChange}
                                rows="4"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                placeholder="Our vision is..."
                            ></textarea>
                        </div>
                    </div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-gray-100">
                    <h2 className="text-xl font-bold text-gray-900">Company Stats</h2>
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
                                        placeholder="e.g. Projects Completed"
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

            {/* Team Link */}
            <div className="bg-blue-50 rounded-xl p-6 border border-blue-100 flex justify-between items-center">
                <div>
                    <h3 className="font-bold text-blue-900">Manage Team Members</h3>
                    <p className="text-sm text-blue-700">Team members are now managed in a dedicated section.</p>
                </div>
                <Link
                    to="/admin/team"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                    Go to Team Manager
                </Link>
            </div>
        </div>
    );
};

export default AboutManager;
