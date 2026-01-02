import React, { useEffect, useState } from 'react';
import * as projectsService from '../../services/projects.service';
import ImageUpload from './ImageUpload';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, Edit2, Trash2, Calendar, User,
  Briefcase, Check, X, Image as ImageIcon, ChevronDown, ChevronUp
} from 'lucide-react';

const emptyProject = {
  title: '',
  shortDescription: '',
  category: '',
  client: '',
  date: '',
  duration: '',
  images: [],
  description: '',
  challenge: '',
  solution: '',
  results: '',
  services: '',
  featured: false,
};

const categories = [
  'Automotive', 'Aerospace', 'Manufacturing', 'Energy', 'Medical', 'Robotics', 'Design'
];

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

const ProjectsManager = () => {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState(emptyProject);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');

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
      toast.error('Failed to load projects');
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

    const projectData = {
      title: form.title,
      shortDescription: form.shortDescription,
      featured: form.featured
    };

    if (form.category) projectData.category = form.category;
    if (form.client) projectData.client = form.client;
    if (form.date) projectData.date = form.date;
    if (form.duration) projectData.duration = form.duration;
    if (form.images && form.images.length > 0) projectData.images = form.images;
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
        toast.success('Project updated successfully');
        setIsEditing(null);
        setShowForm(false);
      } else {
        const newProject = await projectsService.createProject(projectData);
        setProjects([newProject, ...projects]);
        toast.success('Project created successfully');
        setShowForm(false);
      }
      setForm(emptyProject);
    } catch (error) {
      console.error('Error saving project:', error);
      toast.error(error.response?.data?.message || 'Failed to save project');
    } finally {
      setSaving(false);
    }
  };

  const removeProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.deleteProject(id);
        setProjects(projects.filter((p) => p._id !== id));
        toast.success('Project deleted');
      } catch (error) {
        console.error('Error deleting project:', error);
        toast.error('Failed to delete project');
      }
    }
  };

  const editProject = (project) => {
    const editForm = {
      ...project,
      date: project.date ? new Date(project.date).toISOString().split('T')[0] : '',
      services: Array.isArray(project.services) ? project.services.join(', ') : (project.services || ''),
      images: project.images || (project.image ? [project.image] : []),
      category: project.category || ''
    };
    setForm(editForm);
    setIsEditing(project._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFeatured = async (project) => {
    try {
      const updated = await projectsService.updateProject(project._id, {
        ...project,
        featured: !project.featured
      });
      setProjects(projects.map(p => p._id === project._id ? updated : p));
      toast.success(updated.featured ? 'Project featured' : 'Project removed from featured');
    } catch (error) {
      console.error('Error toggling featured:', error);
      toast.error('Failed to update project');
    }
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.client?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || p.category === filterCategory;
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
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Projects</h1>
          <p className="text-slate-500 text-lg mt-1 font-medium">Showcase your engineering excellence</p>
        </div>
        <button
          onClick={() => {
            setShowForm(!showForm);
            if (!showForm) {
              setForm(emptyProject);
              setIsEditing(null);
            }
          }}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all shadow-md ${showForm
            ? 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            : 'bg-orange-600 text-white hover:bg-orange-700 hover:shadow-lg hover:-translate-y-0.5'
            }`}
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? 'Close Editor' : 'Add New Project'}
        </button>
      </div>

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
                  {isEditing ? 'Edit Project' : 'Create Project'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Project Title *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="e.g. Next-Gen Autonomous Drone"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <div className="relative">
                      <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none appearance-none"
                      >
                        <option value="">Select Category</option>
                        {categories.map(c => (
                          <option key={c} value={c.toLowerCase()}>{c}</option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Client Name</label>
                    <div className="relative">
                      <User className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        name="client"
                        value={form.client}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                        placeholder="e.g. Tesla Inc."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Completion Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleChange}
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Duration</label>
                    <input
                      name="duration"
                      value={form.duration}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="e.g. 6 months"
                    />
                  </div>
                </div>

                {/* Images */}
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 border-dashed">
                  <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-slate-500" />
                    Project Gallery
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">Upload high-quality images to case study.</p>
                  <ImageUpload
                    onUploadComplete={(urls) => setForm(f => ({ ...f, images: urls }))}
                    initialImage={form.images}
                    maxFiles={10}
                    multipleMode={true}
                  />
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Short Summary *</label>
                    <textarea
                      name="shortDescription"
                      value={form.shortDescription}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      rows={2}
                      placeholder="Brief overview for the project card (max 200 chars)"
                      maxLength={200}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-red-600">The Challenge</label>
                      <textarea
                        name="challenge"
                        value={form.challenge}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-red-50 border border-red-100 rounded-xl focus:ring-2 focus:ring-red-500 focus:bg-white transition-all outline-none"
                        rows={4}
                        placeholder="What problem did you solve?"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-blue-600">The Solution</label>
                      <textarea
                        name="solution"
                        value={form.solution}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-blue-50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none"
                        rows={4}
                        placeholder="Your engineering approach..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-green-600">The Results</label>
                      <textarea
                        name="results"
                        value={form.results}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-green-50 border border-green-100 rounded-xl focus:ring-2 focus:ring-green-500 focus:bg-white transition-all outline-none"
                        rows={4}
                        placeholder="Key metrics and outcomes..."
                      />
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="w-5 h-5 text-orange-600 rounded focus:ring-orange-500 border-gray-300"
                    />
                    <label htmlFor="featured" className="text-sm font-semibold text-slate-700">Mark as Featured Project</label>
                  </div>

                  <div className="flex gap-4">
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
                          {isEditing ? 'Update Project' : 'Publish Project'}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filters & Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search projects by title or client..."
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
                <option key={c} value={c.toLowerCase()}>{c}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">No projects found</h3>
            <p className="text-slate-500">Try adjusting your filters or create a new project.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredProjects.map((p) => (
              <motion.article
                key={p._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden bg-slate-100">
                  {((p.images && p.images.length > 0) || p.image) ? (
                    <img
                      src={
                        (() => {
                          const imgUrl = p.images && p.images.length > 0 ? p.images[0] : p.image;
                          return imgUrl?.startsWith('http') ? imgUrl : `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${imgUrl}`;
                        })()
                      }
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <ImageIcon className="w-12 h-12 opacity-50" />
                    </div>
                  )}

                  <div className="absolute top-4 right-4 flex gap-2">
                    {p.featured && (
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-orange-600 text-xs font-bold rounded-full shadow-sm">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {p.category || 'Portfolio'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{p.date}</span>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-2 leading-relaxed">
                    {p.shortDescription}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <div className="flex items-center text-xs text-slate-400 font-medium">
                      {p.client && (
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5" />
                          {p.client}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleFeatured(p)}
                        className={`p-2 rounded-lg transition-colors ${p.featured ? 'bg-yellow-50 text-yellow-500' : 'bg-slate-50 text-slate-400 hover:text-yellow-500'}`}
                        title={p.featured ? 'Unfeature' : 'Mark as Featured'}
                      >
                        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => editProject(p)}
                        className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        title="Edit Project"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeProject(p._id)}
                        className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProjectsManager;
