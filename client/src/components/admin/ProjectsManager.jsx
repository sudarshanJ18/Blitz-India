import React, { useEffect, useState } from 'react';

const emptyProject = {
  title: '',
  shortDescription: '',
  category: '',
  client: '',
  date: '',
  duration: '',
  image: '',
  description: '',
};

const loadProjects = () => {
  try {
    const raw = localStorage.getItem('admin.projects');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveProjects = (projects) => {
  localStorage.setItem('admin.projects', JSON.stringify(projects));
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    setProjects(loadProjects());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription) return;
    
    if (isEditing) {
      const next = projects.map(p => p._id === isEditing ? { ...form, _id: isEditing, results: p.results || [] } : p);
      setProjects(next);
      saveProjects(next);
      setIsEditing(null);
    } else {
      const newProject = { _id: Date.now(), results: [], ...form };
      const next = [newProject, ...projects];
      setProjects(next);
      saveProjects(next);
    }
    setForm(emptyProject);
  };

  const removeProject = (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      const next = projects.filter((p) => p._id !== id);
      setProjects(next);
      saveProjects(next);
    }
  };

  const editProject = (project) => {
    setForm(project);
    setIsEditing(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(emptyProject);
    setIsEditing(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Manage Projects
        </h1>
        <p className="text-gray-600 text-lg">Create and manage your portfolio projects</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Project' : 'Add New Project'}
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
                placeholder="Project title"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
              <input 
                name="category" 
                value={form.category} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="e.g. Automotive, Aerospace"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
              <input 
                name="client" 
                value={form.client} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Client name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="YYYY-MM-DD"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
              <input 
                name="duration" 
                value={form.duration} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="e.g. 3 months"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL</label>
              <input 
                name="image" 
                value={form.image} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
            <input 
              name="shortDescription" 
              value={form.shortDescription} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              placeholder="Brief project description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
            <textarea 
              name="description" 
              value={form.description} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              rows={5}
              placeholder="Detailed project description"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isEditing ? 'Update Project' : 'Add Project'}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Projects ({projects.length})</h2>
        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No projects yet. Add your first project above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article 
                key={p._id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {p.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {p.category || 'Uncategorized'}
                    </span>
                    <span className="text-xs text-gray-500">{p.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{p.title}</h2>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{p.shortDescription}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {p.client && <span className="block">{p.client}</span>}
                      {p.duration && <span>{p.duration}</span>}
                    </div>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => editProject(p)}
                        className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => removeProject(p._id)} 
                        className="text-red-600 hover:text-red-700 text-sm font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </div>
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

export default ProjectsManager;
