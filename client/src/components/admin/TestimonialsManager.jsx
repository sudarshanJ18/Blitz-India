import React, { useState, useEffect } from 'react';
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from '../../services/testimonials.service';
import ImageUpload from './ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus, Search, Edit2, Trash2, Check, X,
    MessageSquare, Star, User, Building, Quote, Briefcase, Eye, EyeOff, Award
} from 'lucide-react';

const initialForm = {
    name: '',
    position: '',
    company: '',
    testimonial: '',
    rating: 5,
    image: '',
    published: false,
    featured: false
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 100 }
    }
};

const TestimonialsManager = () => {
    const [testimonials, setTestimonials] = useState([]);
    const [form, setForm] = useState(initialForm);
    const [isEditing, setIsEditing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState({ type: '', text: '' });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const data = await getAdminTestimonials();
            setTestimonials(data || []);
        } catch (error) {
            console.error('Error fetching testimonials:', error);
            showMessage('error', 'Failed to load testimonials');
        } finally {
            setLoading(false);
        }
    };

    const showMessage = (type, text) => {
        setMessage({ type, text });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            // Ensure payload uses 'testimonial' key
            const payload = {
                ...form,
                testimonial: form.testimonial
            };

            if (isEditing) {
                await updateTestimonial(isEditing, payload);
                showMessage('success', 'Testimonial updated');
            } else {
                await createTestimonial(payload);
                showMessage('success', 'Testimonial created');
            }
            setForm(initialForm);
            setIsEditing(null);
            setShowForm(false);
            fetchTestimonials();
        } catch (error) {
            console.error('Error saving testimonial:', error);
            showMessage('error', 'Failed to save testimonial');
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                await deleteTestimonial(id);
                setTestimonials(prev => prev.filter(t => t._id !== id));
                showMessage('success', 'Testimonial deleted');
            } catch (error) {
                console.error('Error deleting testimonial:', error);
                showMessage('error', 'Failed to delete testimonial');
            }
        }
    };

    const handleEdit = (testimonial) => {
        setForm({
            name: testimonial.name,
            position: testimonial.position,
            company: testimonial.company,
            // Handle potentially different field names from backend
            testimonial: testimonial.testimonial || testimonial.message || '',
            rating: testimonial.rating || 5,
            image: testimonial.image || '',
            published: testimonial.published || false,
            featured: testimonial.featured || false
        });
        setIsEditing(testimonial._id);
        setShowForm(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleTogglePublish = async (testimonial) => {
        try {
            const newStatus = !testimonial.published;
            await updateTestimonial(testimonial._id, { published: newStatus });
            setTestimonials(prev => prev.map(t =>
                t._id === testimonial._id ? { ...t, published: newStatus } : t
            ));
            showMessage('success', `Testimonial ${newStatus ? 'published' : 'unpublished'}`);
        } catch (error) {
            console.error('Error updating status:', error);
            showMessage('error', 'Failed to update status');
            fetchTestimonials();
        }
    };

    const handleToggleFeatured = async (testimonial) => {
        try {
            const newStatus = !testimonial.featured;
            await updateTestimonial(testimonial._id, { featured: newStatus });
            setTestimonials(prev => prev.map(t =>
                t._id === testimonial._id ? { ...t, featured: newStatus } : t
            ));
            showMessage('success', `Testimonial ${newStatus ? 'featured' : 'unfeatured'}`);
        } catch (error) {
            console.error('Error updating status:', error);
            showMessage('error', 'Failed to update status');
            fetchTestimonials();
        }
    };

    const filteredTestimonials = testimonials.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.company.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
        );
    }

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Testimonials</h1>
                    <p className="text-slate-500 text-lg mt-1 font-medium">Manage client feedback and reviews</p>
                </div>

                <button
                    onClick={() => {
                        setShowForm(!showForm);
                        if (!showForm) {
                            setForm(initialForm);
                            setIsEditing(null);
                        }
                    }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${showForm
                        ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5'
                        }`}
                >
                    {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                    {showForm ? 'Close Editor' : 'New Testimonial'}
                </button>
            </div>

            {/* Message Notification */}
            <AnimatePresence>
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className={`rounded-xl p-4 flex items-center shadow-sm ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
                            }`}
                    >
                        {message.type === 'success' ? <Check className="w-5 h-5 mr-3" /> : <X className="w-5 h-5 mr-3" />}
                        <span className="font-medium">{message.text}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Form */}
            <AnimatePresence>
                {showForm && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8 mb-8">
                            <div className="flex items-center justify-between mb-8 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
                                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                                        {isEditing ? <Edit2 className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
                                    </div>
                                    {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                                </h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <User className="w-4 h-4" /> Client Name *
                                        </label>
                                        <input
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                            placeholder="e.g. John Doe"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Briefcase className="w-4 h-4" /> Position *
                                        </label>
                                        <input
                                            name="position"
                                            value={form.position}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                            placeholder="e.g. CEO"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Building className="w-4 h-4" /> Company *
                                        </label>
                                        <input
                                            name="company"
                                            value={form.company}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                            placeholder="e.g. Tech Corp"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                            <Star className="w-4 h-4" /> Rating (1-5) *
                                        </label>
                                        <input
                                            type="number"
                                            name="rating"
                                            min="1"
                                            max="5"
                                            value={form.rating}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                        <Quote className="w-4 h-4" /> Testimonial Message *
                                    </label>
                                    <textarea
                                        name="testimonial"
                                        value={form.testimonial}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                                        rows={4}
                                        placeholder="Enter the client's feedback here..."
                                        required
                                    />
                                </div>

                                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                                        <User className="w-5 h-5 text-slate-500" />
                                        Client Photo
                                    </h3>
                                    <ImageUpload
                                        onUploadComplete={(url) => setForm(f => ({ ...f, image: url }))}
                                        initialImage={form.image}
                                        maxFiles={1}
                                    />
                                    <input type="hidden" name="image" value={form.image} />
                                </div>

                                <div className="flex flex-wrap gap-6 pt-4 border-t border-gray-100">
                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${form.published ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-300'}`}>
                                            {form.published && <Check className="w-4 h-4 text-white" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="published"
                                            checked={form.published}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">Publish immediately</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${form.featured ? 'bg-yellow-500 border-yellow-500' : 'bg-white border-slate-300'}`}>
                                            {form.featured && <Star className="w-3 h-3 text-white fill-current" />}
                                        </div>
                                        <input
                                            type="checkbox"
                                            name="featured"
                                            checked={form.featured}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        <span className="font-semibold text-slate-700 group-hover:text-yellow-600 transition-colors">Set as Featured</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-100">
                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-6 py-2.5 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={saving}
                                        className="px-8 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                    >
                                        {saving ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="w-5 h-5" />
                                                {isEditing ? 'Update Testimonial' : 'Add Testimonial'}
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* List */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-center gap-4 mb-8">
                    <div className="relative flex-1">
                        <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by name or company..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                        />
                    </div>
                </div>

                {filteredTestimonials.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <MessageSquare className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-700 mb-1">No testimonials found</h3>
                        <p className="text-slate-500">Collect your first client feedback.</p>
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                    >
                        {filteredTestimonials.map((t) => (
                            <motion.div
                                key={t._id}
                                variants={itemVariants}
                                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col"
                            >
                                <div className="p-6 flex-1 flex flex-col">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            {t.image ? (
                                                <img
                                                    src={t.image.startsWith('http') ? t.image : `http://localhost:5000${t.image}`}
                                                    alt={t.name}
                                                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                                    <User className="w-6 h-6" />
                                                </div>
                                            )}
                                            <div>
                                                <h3 className="font-bold text-slate-900 leading-tight">{t.name}</h3>
                                                <p className="text-xs text-slate-500 font-medium">{t.position} at {t.company}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1 items-end">
                                            <span className={`px-2 py-1 text-[10px] uppercase font-bold rounded-lg tracking-wider ${t.published ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                                                }`}>
                                                {t.published ? 'Published' : 'Draft'}
                                            </span>
                                            {t.featured && (
                                                <span className="px-2 py-1 text-[10px] uppercase font-bold rounded-lg tracking-wider bg-yellow-100 text-yellow-700 flex items-center gap-1">
                                                    <Award className="w-3 h-3" /> Featured
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="flex gap-1 mb-3">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                                            />
                                        ))}
                                    </div>

                                    <div className="relative flex-1">
                                        <Quote className="absolute -left-1 -top-2 w-6 h-6 text-slate-100 transform -scale-x-100" />
                                        <p className="text-slate-600 text-sm leading-relaxed italic pl-6 relative z-10 line-clamp-4">
                                            "{t.testimonial || t.message}"
                                        </p>
                                    </div>
                                </div>

                                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleTogglePublish(t)}
                                            className={`p-2 rounded-lg transition-colors shadow-sm ${t.published
                                                ? 'bg-white text-green-600 hover:bg-green-50'
                                                : 'bg-white text-slate-400 hover:bg-green-50 hover:text-green-600'
                                                }`}
                                            title={t.published ? "Unpublish" : "Publish"}
                                        >
                                            {t.published ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                        </button>
                                        <button
                                            onClick={() => handleToggleFeatured(t)}
                                            className={`p-2 rounded-lg transition-colors shadow-sm ${t.featured
                                                ? 'bg-white text-yellow-500 hover:bg-yellow-50'
                                                : 'bg-white text-slate-400 hover:bg-yellow-50 hover:text-yellow-500'
                                                }`}
                                            title={t.featured ? "Remove from Featured" : "Add to Featured"}
                                        >
                                            <Star className={`w-4 h-5 ${t.featured ? 'fill-current' : ''}`} />
                                        </button>
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(t)}
                                            className="p-2 bg-white text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors shadow-sm"
                                            title="Edit"
                                        >
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(t._id)}
                                            className="p-2 bg-white text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors shadow-sm"
                                            title="Delete"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default TestimonialsManager;
