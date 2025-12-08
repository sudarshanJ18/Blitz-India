import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import {
  getAllServices,
  createService,
  updateService,
  deleteService
} from '../../services/services.service';

const emptyService = {
  title: '',
  shortDescription: '',
  category: '',
  image: '',
  description: '',
  features: [],
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
        setMessage({ type: 'success', text: 'Service updated successfully!' });
        setIsEditing(null);
      } else {
        const response = await createService(serviceData);
        setServices([response.data, ...services]);
        setMessage({ type: 'success', text: 'Service created successfully!' });
      }

      setForm(emptyService);
      setSubmitting(false);

      // Clear message after 3 seconds
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
        setMessage({ type: 'success', text: 'Service deleted successfully!' });
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(emptyService);
    setIsEditing(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Manage Services
        </h1>
        <p className="text-gray-600 text-lg">Create and manage your service offerings</p>
      </div>

      {/* Message Notification */}
      {message.text && (
        <div className={`rounded-lg p-4 ${message.type === 'success'
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
          }`}>
          <div className="flex items-center">
            {message.type === 'success' ? (
              <svg className="w-5 h-5 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            )}
            <p className={`text-sm font-medium ${message.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
              {message.text}
            </p>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Service' : 'Add New Service'}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Service title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                required
              >
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Auto-generated Category/Subcategory ID Display */}
          {form.category && (
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-orange-900 mb-1">Auto-Generated Service ID</p>
                  <p className="text-xs text-orange-700">
                    This service will be accessible at: /services/{apiCategories.find(c => c.title === form.category)?.categoryId}/{isEditing ? form.subId : nextSubId}
                  </p>
                </div>
                <div className="text-right">
                  <div className="bg-orange-600 text-white px-4 py-2 rounded-lg font-bold text-lg">
                    {apiCategories.find(c => c.title === form.category)?.categoryId}.{isEditing ? form.subId : nextSubId}
                  </div>
                  <p className="text-xs text-orange-700 mt-1">Category.SubCategory</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Service Image</label>
            <ImageUpload
              onUploadComplete={(url) => setForm(f => ({ ...f, image: url }))}
              initialImage={form.image}
              maxFiles={1}
            />
            <input type="hidden" name="image" value={form.image} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
              <input
                name="shortDescription"
                value={form.shortDescription}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Brief service description"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                rows={6}
                placeholder="Detailed service description"
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {submitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </span>
              ) : (
                isEditing ? 'Update Service' : 'Add Service'
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Services Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Services ({services.length})</h2>
        {services.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No services yet. Add your first service above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <article
                key={s._id || s.title}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {s.image && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={s.image.startsWith('http') ? s.image : `${import.meta.env.VITE_API_URL}${s.image}`}
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {/* Service ID Badge */}
                    <div className="absolute top-3 right-3 bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {s.categoryId}.{s.subId}
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {s.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-500">{s.features?.length || 0} features</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{s.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{s.shortDescription}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button
                      onClick={() => editService(s)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeService(s._id)}
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

export default ServicesManager;
