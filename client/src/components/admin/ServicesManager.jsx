import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import {
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../../services/services.service';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, Edit2, Trash2, Layers,
  Check, X, Image as ImageIcon, ChevronDown, Wrench, Settings, Brain
} from 'lucide-react';

const emptyService = {
  title: '',
  shortDescription: '',
  category: '',
  image: '',
  description: '',
  features: [],
};

const CATEGORY_ICONS = {
  'Engineering Design': Wrench,
  'Manufacturing Solutions': Settings,
  'Advanced Analysis': Brain,
  'default': Layers
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

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [isEditing, setIsEditing] = useState(null);
  const [apiCategories, setApiCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [nextSubId, setNextSubId] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

  // Fetch categories and services from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, servicesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/services/categories`),
          getAllServices()
        ]);
        setApiCategories(categoriesRes.data.data || []);
        setServices(servicesRes.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setMessage({ type: 'error', text: 'Failed to load data' });
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = useMemo(() => {
    return apiCategories.map(c => c.title);
  }, [apiCategories]);

  // Calculate next subId when category changes
  useEffect(() => {
    if (form.category && !isEditing) {
      const selectedCategory = apiCategories.find(c => c.title === form.category);
      if (selectedCategory) {
        const categoryServices = services.filter(s => s.categoryId === selectedCategory.categoryId);
        const maxSubId = categoryServices.length > 0
          ? Math.max(...categoryServices.map(s => s.subId || 0))
          : 0;
        setNextSubId(maxSubId + 1);
      }
    }
  }, [form.category, apiCategories, services, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription || !form.category) return;

    setSubmitting(true);
    setMessage({ type: '', text: '' });

    try {
      const selectedCategory = apiCategories.find(c => c.title === form.category);
      if (!selectedCategory) {
        throw new Error('Invalid category selected');
      }

      const serviceData = {
        ...form,
        categoryId: selectedCategory.categoryId,
        category: selectedCategory.title,
        subId: isEditing ? form.subId : nextSubId,
        features: form.features || [],
      };

      if (isEditing) {
        const response = await updateService(isEditing, serviceData);
        setServices(services.map(s => s._id === isEditing ? response.data : s));
        setMessage({ type: 'success', text: 'Service updated successfully' });
        setIsEditing(null);
        setShowForm(false);
      } else {
        const response = await createService(serviceData);
        setServices([response.data, ...services]);
        setMessage({ type: 'success', text: 'Service created successfully' });
        setShowForm(false);
      }

      setForm(emptyService);
      setSubmitting(false);
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (error) {
      console.error('Failed to save service:', error);
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Failed to save service'
      });
      setSubmitting(false);
    }
  };

  const removeService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deleteService(id);
        setServices(services.filter((s) => s._id !== id));
        setMessage({ type: 'success', text: 'Service deleted' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } catch (error) {
        console.error('Failed to delete service:', error);
        setMessage({
          type: 'error',
          text: error.response?.data?.message || 'Failed to delete service'
        });
      }
    }
  };

  const editService = (service) => {
    setForm(service);
    setIsEditing(service._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const filteredServices = services.filter(s => {
    const matchesSearch = s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || s.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

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
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Services</h1>
          <p className="text-slate-500 text-lg mt-1 font-medium">Manage your portfolio of services</p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setForm(emptyService);
              setIsEditing(null);
            }
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${showForm
            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5'
            }`}
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Close Editor' : 'Add New Service'}
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

      {/* Form Section */}
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
                  {isEditing ? 'Edit Service' : 'Create Service'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Main Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Service Title *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="e.g. 3D Modeling"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category *</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none appearance-none"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* ID Preview */}
                <AnimatePresence>
                  {form.category && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                          <Layers className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-orange-900">System ID Assignment</p>
                          <p className="text-xs text-orange-700">
                            Identifier: <code className="bg-white/50 px-1 rounded">{apiCategories.find(c => c.title === form.category)?.categoryId}.{isEditing ? form.subId : nextSubId}</code>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Image Upload */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-slate-500" />
                    Cover Image
                  </h3>
                  <ImageUpload
                    onUploadComplete={(url) => setForm(f => ({ ...f, image: url }))}
                    initialImage={form.image}
                    maxFiles={1}
                  />
                  <input type="hidden" name="image" value={form.image} />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Short Summary *</label>
                    <input
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="Brief overview for cards"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Detailed Description</label>
                    <textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      rows={6}
                      placeholder="Full details about this service..."
                    />
                  </div>
                </div>

                {/* Actions */}
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
                    disabled={submitting}
                    className="px-8 py-2.5 bg-orange-600 text-white font-bold rounded-xl hover:bg-orange-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Check className="w-5 h-5" />
                        {isEditing ? 'Update Service' : 'Create Service'}
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid & Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
            />
          </div>
          <div className="relative w-full md:w-64">
            <Filter className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none appearance-none"
            >
              <option value="">All Categories</option>
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {filteredServices.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Layers className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">No services found</h3>
            <p className="text-slate-500">Create a new service to get started.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredServices.map((s) => {
              const Icon = CATEGORY_ICONS[s.category] || CATEGORY_ICONS['default'];

              return (
                <motion.article
                  key={s._id || s.title}
                  variants={itemVariants}
                  className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    {s.image ? (
                      <img
                        src={s.image.startsWith('http') ? s.image : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${s.image}`}
                        alt={s.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-400">
                        <Icon className="w-12 h-12 opacity-50" />
                      </div>
                    )}

                    <div className="absolute top-3 right-3 flex gap-2">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-700 text-xs font-bold rounded-full shadow-sm">
                        {s.categoryId}.{s.subId}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                        {s.category || 'General'}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                      {s.shortDescription}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                      <div className="text-xs text-slate-400 font-medium">
                        {s.features?.length || 0} features included
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editService(s)}
                          className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeService(s._id)}
                          className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ServicesManager;
