import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import blogsService from '../../services/blogs.service';
import ImageUpload from './ImageUpload';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Search, Filter, Edit2, Trash2, FileText, Check, X,
  Image as ImageIcon, ChevronDown, Eye, EyeOff, User, Tag
} from 'lucide-react';

const initialForm = {
  title: '',
  category: '',
  summary: '',
  content: '',
  image: '',
  tags: '',
  author: '',
  published: false,
  featured: false,
};

const editorModules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    ['link', 'image'],
    [{ color: [] }, { background: [] }],
    ['blockquote', 'code-block'],
    ['clean'],
  ],
};

const editorFormats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list',
  'indent',
  'link', 'image',
  'align',
  'color', 'background',
  'blockquote', 'code-block',
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

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const data = await blogsService.getAdminBlogs();
      setBlogs(data || []);
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showMessage('error', 'Failed to load blogs');
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
    setForm((f) => ({
      ...f,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleContentChange = (content) => {
    setForm((f) => ({ ...f, content }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.summary || !form.content) {
      showMessage('error', 'Please fill in title, summary, and content');
      return;
    }

    try {
      setSaving(true);
      const blogData = {
        ...form,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        publishedDate: new Date().toISOString(),
      };

      if (isEditing) {
        await blogsService.updateBlog(isEditing, blogData);
        showMessage('success', 'Blog updated successfully');
        setIsEditing(null);
        setShowForm(false);
      } else {
        await blogsService.createBlog(blogData);
        showMessage('success', 'Blog created successfully');
        setShowForm(false);
      }

      setForm(initialForm);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      showMessage('error', error.response?.data?.message || 'Failed to save blog');
    } finally {
      setSaving(false);
    }
  };

  const removeBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsService.deleteBlog(id);
        showMessage('success', 'Blog deleted successfully');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        showMessage('error', 'Failed to delete blog');
      }
    }
  };

  const editBlog = (blog) => {
    setForm({
      title: blog.title || '',
      category: blog.category || '',
      summary: blog.summary || '',
      content: blog.content || '',
      image: blog.image || '',
      tags: blog.tags ? blog.tags.join(', ') : '',
      author: blog.author || '',
      published: blog.published || false,
      featured: blog.featured || false,
    });
    setIsEditing(blog._id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const togglePublished = async (blog) => {
    try {
      await blogsService.updateBlog(blog._id, { published: !blog.published });
      fetchBlogs();
      showMessage('success', `Blog ${!blog.published ? 'published' : 'unpublished'}`);
    } catch (error) {
      console.error('Error toggling status:', error);
      showMessage('error', 'Failed to update status');
    }
  };

  const filteredBlogs = blogs.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || b.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(blogs.map(b => b.category).filter(Boolean))];

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
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">Blogs</h1>
          <p className="text-slate-500 text-lg mt-1 font-medium">Manage your articles and news</p>
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
          {showForm ? 'Close Editor' : 'New Article'}
        </button>
      </div>

      
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
                  {isEditing ? 'Edit Article' : 'Write New Article'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Title *</label>
                    <input
                      name="title"
                      value={form.title}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="Article Headline"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Category</label>
                    <input
                      name="category"
                      value={form.category}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="e.g. Industry News"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <User className="w-4 h-4" /> Author
                    </label>
                    <input
                      name="author"
                      value={form.author}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="Writer's Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Tags
                    </label>
                    <input
                      name="tags"
                      value={form.tags}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                      placeholder="Separate with commas"
                    />
                  </div>
                </div>

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

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Summary *</label>
                  <textarea
                    name="summary"
                    value={form.summary}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all outline-none"
                    rows={3}
                    placeholder="Short excerpt for card preview..."
                    required
                    maxLength={300}
                  />
                  <p className="text-xs text-slate-400 text-right">{form.summary.length}/300</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Content *</label>
                  <div className="prose-editor-wrapper">
                    <ReactQuill
                      theme="snow"
                      value={form.content}
                      onChange={handleContentChange}
                      modules={editorModules}
                      formats={editorFormats}
                      className="bg-white rounded-xl border-slate-200"
                      style={{ height: '400px', marginBottom: '50px' }}
                    />
                  </div>
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
                    <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${form.featured ? 'bg-orange-600 border-orange-600' : 'bg-white border-slate-300'}`}>
                      {form.featured && <Check className="w-4 h-4 text-white" />}
                    </div>
                    <input
                      type="checkbox"
                      name="featured"
                      checked={form.featured}
                      onChange={handleChange}
                      className="hidden"
                    />
                    <span className="font-semibold text-slate-700 group-hover:text-orange-600 transition-colors">Mark as Featured</span>
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
                        {isEditing ? 'Update Article' : 'Publish Article'}
                      </>
                    )}
                  </button>
                </div>

              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-3.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles..."
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

        {filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-700 mb-1">No articles found</h3>
            <p className="text-slate-500">Start writing your first blog post above.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
          >
            {filteredBlogs.map((b) => (
              <motion.article
                key={b._id}
                variants={itemVariants}
                className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden bg-slate-100">
                  {b.image ? (
                    <img
                      src={b.image.startsWith('http') ? b.image : `http://localhost:5000${b.image}`}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <ImageIcon className="w-12 h-12" />
                    </div>
                  )}

                  <div className="absolute top-3 right-3 flex gap-2">
                    <span className={`px-2 py-1 text-xs font-bold rounded-full backdrop-blur-md ${b.published ? 'bg-green-500/90 text-white' : 'bg-slate-500/90 text-white'
                      }`}>
                      {b.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full uppercase tracking-wider">
                      {b.category || 'General'}
                    </span>
                    {b.featured && (
                      <span className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        ★ Featured
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-2 line-clamp-2 leading-tight group-hover:text-orange-600 transition-colors">
                    {b.title}
                  </h3>
                  <p className="text-slate-500 text-sm mb-4 line-clamp-3 leading-relaxed">
                    {b.summary}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                    <button
                      onClick={() => togglePublished(b)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-colors ${b.published
                        ? 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                        : 'bg-green-50 text-green-700 hover:bg-green-100'
                        }`}
                    >
                      {b.published ? <div className="flex items-center gap-1"><EyeOff className="w-3 h-3" /> Unpublish</div> : <div className="flex items-center gap-1"><Eye className="w-3 h-3" /> Publish</div>}
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => editBlog(b)}
                        className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeBlog(b._id)}
                        className="p-2 bg-slate-50 text-slate-600 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Delete"
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

export default BlogsManager;
