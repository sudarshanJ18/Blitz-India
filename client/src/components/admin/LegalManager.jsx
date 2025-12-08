import React, { useState, useEffect } from 'react';
import { getLegalContent, updateLegalContent } from '../../services/content.service';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/LoadingSpinner';

const LegalManager = () => {
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('privacy'); // 'privacy' or 'terms'
    const [content, setContent] = useState({
        privacyPolicy: '',
        termsOfService: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        try {
            const data = await getLegalContent();
            if (data) {
                setContent({
                    privacyPolicy: data.privacyPolicy || '',
                    termsOfService: data.termsOfService || ''
                });
            }
        } catch (error) {
            console.error('Error fetching legal content:', error);
            if (error.response?.status !== 404) {
                toast.error('Failed to load legal content');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setContent(prev => ({
            ...prev,
            [activeTab === 'privacy' ? 'privacyPolicy' : 'termsOfService']: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateLegalContent(content);
            toast.success('Legal documents updated');
        } catch (error) {
            console.error('Error updating legal content:', error);
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
                    <h1 className="text-3xl font-bold text-gray-900">Legal Documents</h1>
                    <p className="text-gray-600 mt-1">Manage Privacy Policy and Terms of Service.</p>
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

            <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-100">
                    <button
                        onClick={() => setActiveTab('privacy')}
                        className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'privacy'
                                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Privacy Policy
                    </button>
                    <button
                        onClick={() => setActiveTab('terms')}
                        className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${activeTab === 'terms'
                                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-600'
                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                            }`}
                    >
                        Terms of Service
                    </button>
                </div>

                {/* Editor */}
                <div className="p-6">
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            {activeTab === 'privacy' ? 'Privacy Policy Content' : 'Terms of Service Content'} (Markdown Supported)
                        </label>
                        <textarea
                            value={activeTab === 'privacy' ? content.privacyPolicy : content.termsOfService}
                            onChange={handleChange}
                            rows="20"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent font-mono text-sm"
                            placeholder="Write your legal content here using Markdown..."
                        ></textarea>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="text-sm font-bold text-blue-900 mb-1">Formatting Tips</h4>
                        <ul className="text-xs text-blue-800 list-disc list-inside space-y-1">
                            <li>Use # for main headings</li>
                            <li>Use ## for subheadings</li>
                            <li>Use **text** for bold</li>
                            <li>Use *text* for italics</li>
                            <li>Use - for bullet points</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalManager;
