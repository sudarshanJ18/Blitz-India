import React, { useEffect, useState } from 'react';

const initialForm = {
  title: '',
  category: '',
  date: '',
  excerpt: '',
  image: '',
  content: '',
};

const loadBlogs = () => {
  try {
    const raw = localStorage.getItem('admin.blogs');
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

const saveBlogs = (blogs) => {
  localStorage.setItem('admin.blogs', JSON.stringify(blogs));
};

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    setBlogs(loadBlogs());
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.excerpt) return;
    
    if (isEditing) {
      const next = blogs.map(b => b.id === isEditing ? { ...form, id: isEditing } : b);
      setBlogs(next);
      saveBlogs(next);
      setIsEditing(null);
    } else {
      const newBlog = { id: Date.now(), ...form };
      const next = [newBlog, ...blogs];
      setBlogs(next);
      saveBlogs(next);
    }
    setForm(initialForm);
  };

  const removeBlog = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const next = blogs.filter((b) => b.id !== id);
      setBlogs(next);
      saveBlogs(next);
    }
  };

  const editBlog = (blog) => {
    setForm(blog);
    setIsEditing(blog.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(initialForm);
    setIsEditing(null);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Manage Blogs
        </h1>
        <p className="text-gray-600 text-lg">Create and manage your blog posts</p>
      </div>

      {/* Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {isEditing ? 'Edit Blog' : 'Add New Blog'}
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
                placeholder="Blog title"
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
                placeholder="e.g. Manufacturing, Engineering"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
              <input 
                name="date" 
                value={form.date} 
                onChange={handleChange} 
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Oct 2025"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
            <textarea 
              name="excerpt" 
              value={form.excerpt} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              rows={3} 
              placeholder="Brief summary of the blog post"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content</label>
            <textarea 
              name="content" 
              value={form.content} 
              onChange={handleChange} 
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              rows={6} 
              placeholder="Full blog content"
            />
          </div>
          <div className="flex justify-end">
            <button 
              type="submit" 
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isEditing ? 'Update Blog' : 'Add Blog'}
            </button>
          </div>
        </form>
      </div>

      {/* Blogs Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">All Blogs ({blogs.length})</h2>
        {blogs.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 border border-gray-100 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No blogs yet. Add your first blog above.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((b) => (
              <article 
                key={b.id} 
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                {b.image && (
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={b.image} 
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {b.category || 'General'}
                    </span>
                    <span className="text-xs text-gray-500">{b.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{b.title}</h2>
                  <p className="text-base sm:text-lg font-medium text-gray-600 mb-4 line-clamp-3">{b.excerpt}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button 
                      onClick={() => editBlog(b)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => removeBlog(b.id)} 
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

export default BlogsManager;
