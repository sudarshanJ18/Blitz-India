import React, { useEffect, useMemo, useState } from 'react';
import { serviceCategories } from '../../assets/assets.js';

const emptyService = {
  title: '',
  shortDescription: '',
  category: '',
  image: '',
  description: '',
};

const loadServices = () => {
  try {
    const raw = localStorage.getItem('admin.services');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveServices = (services) => {
  localStorage.setItem('admin.services', JSON.stringify(services));
};

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [form, setForm] = useState(emptyService);
  const [isEditing, setIsEditing] = useState(null);

  const categories = useMemo(() => {
    const set = new Set(serviceCategories.map((c) => c.title));
    return Array.from(set);
  }, []);

  useEffect(() => {
    setServices(loadServices());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription) return;
    
    if (isEditing) {
      const next = services.map(s => (s.id === isEditing || s._id === isEditing) ? { ...form, id: isEditing || s._id, features: s.features || [] } : s);
      setServices(next);
      saveServices(next);
      setIsEditing(null);
    } else {
      const newService = { id: Date.now(), features: [], ...form };
      const next = [newService, ...services];
      setServices(next);
      saveServices(next);
    }
    setForm(emptyService);
  };

  const removeService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      const next = services.filter((s) => s.id !== id && s._id !== id);
      setServices(next);
      saveServices(next);
    }
  };

  const editService = (service) => {
    setForm(service);
    setIsEditing(service.id || service._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(emptyService);
    setIsEditing(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Manage Services
        </h1>
        <p className="text-gray-600 text-lg">Create and manage your service offerings</p>
      </div>

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
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input 
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
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
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isEditing ? 'Update Service' : 'Add Service'}
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
                key={s.id || s._id || s.title} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {s.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={s.image} 
                      alt={s.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
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
                      onClick={() => removeService(s.id || s._id)} 
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
