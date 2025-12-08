import React, { useEffect, useState } from 'react';
import * as testimonialsService from '../../services/testimonials.service';
import ImageUpload from './ImageUpload';
import toast from 'react-hot-toast';

const emptyTestimonial = {
    name: '',
    position: '',
    company: '',
    testimonial: '',
    image: '',
    rating: 5,
    featured: false,
    published: true,
};

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState(emptyTestimonial);
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const data = await testimonialsService.getAdminTestimonials();
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            toast.error('Failed to load testimonials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : (type === 'number' ? parseInt(value) : (value || ''));
        setForm((f) => ({ ...f, [name]: newValue }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.name || !form.position || !form.company || !form.testimonial) {
            toast.error('Name, position, company, and testimonial are required');
            return;
        }

        const testimonialData = {
            name: form.name,
            position: form.position,
            company: form.company,
            testimonial: form.testimonial,
            rating: form.rating,
            featured: form.featured,
            published: form.published
        };

        if (form.image) testimonialData.image = form.image;

        try {
            setSaving(true);
            if (isEditing) {
                const updated = await testimonialsService.updateTestimonial(isEditing, testimonialData);
                setTestimonials(testimonials.map(t => t._id === isEditing ? updated : t));
                toast.success('Testimonial updated successfully!');
                setIsEditing(null);
            } else {
                const newTestimonial = await testimonialsService.createTestimonial(testimonialData);
                setTestimonials([newTestimonial, ...testimonials]);
                toast.success('Testimonial created successfully!');
            }
            setForm(emptyTestimonial);
        } catch (error) {
            console.error('Error saving testimonial:', error);
            console.error('Error response:', error.response?.data);
            const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to save testimonial';
            toast.error(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    const removeTestimonial = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await testimonialsService.deleteTestimonial(id);
                setTestimonials(testimonials.filter((t) => t._id !== id));
                toast.success('Testimonial deleted successfully!');
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                toast.error('Failed to delete testimonial');
            }
        }
    };

    const editTestimonial = (testimonial) => {
        const editForm = {
            name: testimonial.name || '',
            position: testimonial.position || '',
            company: testimonial.company || '',
            testimonial: testimonial.testimonial || '',
            image: testimonial.image || '',
            rating: testimonial.rating || 5,
            featured: testimonial.featured || false,
            published: testimonial.published !== undefined ? testimonial.published : true
        };
        setForm(editForm);
        setIsEditing(testimonial._id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const cancelEdit = () => {
        setForm(emptyTestimonial);
        setIsEditing(null);
    };

    const toggleFeatured = async (testimonial) => {
        try {
            const updated = await testimonialsService.updateTestimonial(testimonial._id, {
                ...testimonial,
                featured: !testimonial.featured
            });
            setTestimonials(testimonials.map(t => t._id === testimonial._id ? updated : t));
            toast.success(`Testimonial ${updated.featured ? 'featured' : 'unfeatured'}!`);
        } catch (error) {
            console.error('Error toggling featured:', error);
            toast.error('Failed to update testimonial');
        }
    };

    const togglePublished = async (testimonial) => {
        try {
            const updated = await testimonialsService.updateTestimonial(testimonial._id, {
                ...testimonial,
                published: !testimonial.published
            });
            setTestimonials(testimonials.map(t => t._id === testimonial._id ? updated : t));
            toast.success(`Testimonial ${updated.published ? 'published' : 'unpublished'}!`);
        } catch (error) {
            console.error('Error toggling published:', error);
            toast.error('Failed to update testimonial');
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
                    Manage Testimonials
                </h1>
                <p className="text-gray-600 text-lg">Create and manage customer testimonials</p>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                        {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h2>
                    {isEditing && (
                        <button
                            onClick={cancelEdit}
                            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Customer Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Customer Information
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Name *</label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                    placeholder="Customer name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Position *</label>
                                <input
                                    name="position"
                                    value={form.position}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                    placeholder="e.g. CTO, Product Manager"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">Company *</label>
                                <input
                                    name="company"
                                    value={form.company}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                                    placeholder="Company name"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Customer Image */}
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-600">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            Customer Photo
                        </h3>
                        <ImageUpload
                            onUploadComplete={(url) => setForm(f => ({ ...f, image: url }))}
                            initialImage={form.image}
                            maxFiles={1}
                        />
                        <input type="hidden" name="image" value={form.image} />
                        <p className="text-xs text-gray-500 mt-2">Optional: Upload customer's photo</p>
                    </div>

                    {/* Testimonial Content */}
                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600">
                        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                            <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                            Testimonial
                        </h3>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Testimonial Text *</label>
                            <textarea
                                name="testimonial"
                                value={form.testimonial}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                                rows={5}
                                placeholder="What did the customer say about your service?"
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Rating</label>
                            <select
                                name="rating"
                                value={form.rating}
                                onChange={handleChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                            >
                                <option value={5}>5 Stars - Excellent</option>
                                <option value={4}>4 Stars - Very Good</option>
                                <option value={3}>3 Stars - Good</option>
                                <option value={2}>2 Stars - Fair</option>
                                <option value={1}>1 Star - Poor</option>
                            </select>
                        </div>
                    </div>

                    {/* Options */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div className="flex gap-6">
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="featured"
                                    checked={form.featured}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
                                />
                                <label className="ml-3 text-sm font-semibold text-gray-700 flex items-center">
                                    <svg className="w-5 h-5 text-yellow-500 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    Featured
                                </label>
                            </div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="published"
                                    checked={form.published}
                                    onChange={handleChange}
                                    className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                                />
                                <label className="ml-3 text-sm font-semibold text-gray-700">
                                    Published
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                        >
                            {saving ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>

            {/* Testimonials List */}
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Testimonials ({testimonials.length})</h2>
                {testimonials.length === 0 ? (
                    <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <p className="text-gray-500 text-lg">No testimonials yet. Add your first testimonial above.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {testimonials.map((t) => (
                            <article
                                key={t._id}
                                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    {t.image ? (
                                        <img
                                            src={t.image}
                                            alt={t.name}
                                            className="w-16 h-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-xl">
                                            {t.name.charAt(0)}
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-lg font-bold text-gray-900">{t.name}</h3>
                                        <p className="text-sm text-gray-600">{t.position}</p>
                                        <p className="text-sm text-orange-600 font-semibold">{t.company}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        {[...Array(t.rating)].map((_, i) => (
                                            <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-gray-700 mb-4 italic">"{t.testimonial}"</p>
                                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        {t.featured && (
                                            <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                                                Featured
                                            </span>
                                        )}
                                        {t.published ? (
                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                                                Published
                                            </span>
                                        ) : (
                                            <span className="text-xs font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                                                Draft
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => toggleFeatured(t)}
                                            className={`text-xs font-semibold transition-colors ${t.featured ? 'text-orange-600 hover:text-orange-700' : 'text-gray-400 hover:text-gray-600'
                                                }`}
                                            title={t.featured ? 'Unfeature' : 'Feature'}
                                        >
                                            ★
                                        </button>
                                        <button
                                            onClick={() => togglePublished(t)}
                                            className="text-xs font-semibold text-gray-600 hover:text-gray-800 transition-colors"
                                            title={t.published ? 'Unpublish' : 'Publish'}
                                        >
                                            {t.published ? '👁️' : '👁️‍🗨️'}
                                        </button>
                                        <button
                                            onClick={() => editTestimonial(t)}
                                            className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => removeTestimonial(t._id)}
                                            className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TestimonialsManager;
