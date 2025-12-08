import React, { useEffect, useState } from 'react';
import * as projectsService from '../../services/projects.service';
import ImageUpload from './ImageUpload';
import toast from 'react-hot-toast';

const emptyProject = {
  title: '',
  shortDescription: '',
  category: '',
  client: '',
  date: '',
  duration: '',
  images: [], // Changed from 'image' to 'images' array
  description: '',
  challenge: '',
  solution: '',
  results: '',
  services: '',
  featured: false,
};

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAllProjects();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Failed to load projects. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : (value || '');
    setForm((f) => ({ ...f, [name]: newValue }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.shortDescription) {
      toast.error('Title and short description are required');
      return;
    }

    // Convert services string to array and clean empty values
    const projectData = {
      title: form.title,
      shortDescription: form.shortDescription,
      featured: form.featured
    };

    // Only add optional fields if they have values
    if (form.category) projectData.category = form.category;
    if (form.client) projectData.client = form.client;
    if (form.date) projectData.date = form.date;
    if (form.duration) projectData.duration = form.duration;
    if (form.images && form.images.length > 0) projectData.images = form.images; // Send images array
    if (form.description) projectData.description = form.description;
    if (form.challenge) projectData.challenge = form.challenge;
    if (form.solution) projectData.solution = form.solution;
    if (form.results) projectData.results = form.results;
    if (form.services) {
      projectData.services = form.services.split(',').map(s => s.trim()).filter(s => s);
    }

    try {
      setSaving(true);
      if (isEditing) {
        const updated = await projectsService.updateProject(isEditing, projectData);
        setProjects(projects.map(p => p._id === isEditing ? updated : p));
        toast.success('Project updated successfully!');
        setIsEditing(null);
      } else {
        const newProject = await projectsService.createProject(projectData);
        setProjects([newProject, ...projects]);
        toast.success('Project created successfully!');
      }
      setForm(emptyProject);
    } catch (error) {
      console.error('Error saving project:', error);
      console.error('Error response:', error.response?.data);
      const errorMessage = error.response?.data?.message || error.response?.data?.error || 'Failed to save project';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted successfully!');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const editProject = (project) => {
    // Convert services array to string and format date for editing
    const editForm = {
      ...project,
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
      services: Array.isArray(project.services) ? project.services.join(', ') : (project.services || ''),
      challenge: project.challenge || '',
      solution: project.solution || '',
      results: project.results || '',
      description: project.description || '',
      client: project.client || '',
      duration: project.duration || '',
      // Handle both old single image and new images array
      images: project.images || (project.image ? [project.image] : []),
      category: project.category || ''
    };
    setForm(editForm);
    setIsEditing(project._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(emptyProject);
    setIsEditing(null);
  };

  const toggleFeatured = async (project) => {
    try {
      const updated = await projectsService.updateProject(project._id, {
        ...project,
        featured: !project.featured
      });
      setProjects(projects.map(p => p._id === project._id ? updated : p));
      toast.success(`Project ${updated.featured ? 'featured' : 'unfeatured'}!`);
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Failed to update project');
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
        <h1 className="text-4xl font-bold text-slate-800 mb-2">
          Manage Projects
        </h1>
        <p className="text-slate-600 text-lg">Create and manage your portfolio projects</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {isEditing ? 'Edit Project' : 'Add New Project'}
          </h2>
          {isEditing && (
            <button
              onClick={cancelEdit}
              className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-6 rounded-xl border-l-4 border-orange-600">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-orange-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                  placeholder="Project title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                >
                  <option value="">Select category</option>
                  <option value="automotive">Automotive</option>
                  <option value="aerospace">Aerospace</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="energy">Energy</option>
                  <option value="medical">Medical</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Client</label>
                <input
                  name="client"
                  value={form.client}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                  placeholder="Client name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                <input
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Duration</label>
                <input
                  name="duration"
                  value={form.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all bg-white"
                  placeholder="e.g. 3 months"
                />
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border-l-4 border-purple-600">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Project Images (Upload multiple images)
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Upload as many images as you need to showcase your work. Drag to reorder.
            </p>
            <ImageUpload
              onUploadComplete={(urls) => setForm(f => ({ ...f, images: urls }))}
              initialImage={form.images}
              maxFiles={999} // Allow unlimited images
              multipleMode={true} // Enable multiple image mode
            />
          </div>

          {/* Description Section */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border-l-4 border-blue-600">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Description
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Short Description *</label>
                <input
                  name="shortDescription"
                  value={form.shortDescription}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  placeholder="Brief project description (max 200 characters)"
                  maxLength={200}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                  rows={4}
                  placeholder="Detailed project description"
                />
              </div>
            </div>
          </div>

          {/* Project Details Section */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border-l-4 border-green-600">
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              Project Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-yellow-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Challenge
                </label>
                <textarea
                  name="challenge"
                  value={form.challenge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                  rows={3}
                  placeholder="What was the main challenge or problem to solve?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-blue-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Solution
                </label>
                <textarea
                  name="solution"
                  value={form.solution}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                  rows={3}
                  placeholder="How did you solve the challenge?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <svg className="w-4 h-4 text-green-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Results
                </label>
                <textarea
                  name="results"
                  value={form.results}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                  rows={3}
                  placeholder="What were the outcomes and achievements?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Services Provided</label>
                <input
                  name="services"
                  value={form.services}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all bg-white"
                  placeholder="e.g. 2D Drafting, FEA Analysis, 3D Modeling (comma-separated)"
                />
                <p className="text-xs text-gray-500 mt-1">Separate multiple services with commas</p>
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
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
                Feature this project
              </label>
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
                  {isEditing ? 'Update Project' : 'Add Project'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Projects Grid */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">All Projects ({projects.length})</h2>
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
                {/* Display first image from images array, or fallback to single image field */}
                {((p.images && p.images.length > 0) || p.image) && (
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={
                        (() => {
                          const imgUrl = p.images && p.images.length > 0 ? p.images[0] : p.image;
                          return imgUrl?.startsWith('http') ? imgUrl : `${import.meta.env.VITE_API_URL}${imgUrl}`;
                        })()
                      }
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    {p.featured && (
                      <div className="absolute top-2 right-2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Featured
                      </div>
                    )}
                    {/* Show count if multiple images */}
                    {p.images && p.images.length > 1 && (
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                        </svg>
                        {p.images.length}
                      </div>
                    )}
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
                        onClick={() => toggleFeatured(p)}
                        className={`text-xs font-semibold transition-colors ${p.featured ? 'text-orange-600 hover:text-orange-700' : 'text-gray-400 hover:text-gray-600'
                          }`}
                        title={p.featured ? 'Unfeature' : 'Feature'}
                      >
                        ★
                      </button>
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
