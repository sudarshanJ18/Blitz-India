import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import blogsService from '../../services/blogs.service';
import ImageUpload from './ImageUpload';
import Loader from '../common/Loader';

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

// Quill toolbar configuration
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

const BlogsManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [isEditing, setIsEditing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

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
      alert('Failed to load blogs. Please try again.');
    } finally {
      setLoading(false);
    }
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
      alert('Please fill in title, summary, and content');
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
        alert('Blog updated successfully!');
      } else {
        await blogsService.createBlog(blogData);
        alert('Blog created successfully!');
      }

      setForm(initialForm);
      setIsEditing(null);
      fetchBlogs();
    } catch (error) {
      console.error('Error saving blog:', error);
      const message = error.response?.data?.message || 'Failed to save blog. Please try again.';
      alert(message);
    } finally {
      setSaving(false);
    }
  };

  const removeBlog = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogsService.deleteBlog(id);
        alert('Blog deleted successfully!');
        fetchBlogs();
      } catch (error) {
        console.error('Error deleting blog:', error);
        alert('Failed to delete blog. Please try again.');
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEdit = () => {
    setForm(initialForm);
    setIsEditing(null);
  };

  const togglePublished = async (blog) => {
    try {
      await blogsService.updateBlog(blog._id, { published: !blog.published });
      fetchBlogs();
    } catch (error) {
      console.error('Error toggling published status:', error);
      alert('Failed to update blog status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader size={60} color="#ea580c" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent mb-2">
          Manage Blogs
        </h1>
        <p className="text-gray-600 text-lg">Create and manage your blog posts with a rich text editor</p>
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
              <label className="block text-sm font-semibold text-gray-700 mb-2">Author</label>
              <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="Author name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tags (comma-separated)</label>
              <input
                name="tags"
                value={form.tags}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                placeholder="engineering, innovation, design"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Cover Image</label>
            <ImageUpload
              onUploadComplete={(url) => setForm(f => ({ ...f, image: url }))}
              initialImage={form.image}
              maxFiles={1}
            />
            <input type="hidden" name="image" value={form.image} />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Summary *</label>
            <textarea
              name="summary"
              value={form.summary}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
              rows={3}
              placeholder="Brief summary of the blog post"
              required
              maxLength={300}
            />
            <p className="text-xs text-gray-500 mt-1 text-right">
              {form.summary.length}/300 characters
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
            <ReactQuill
              theme="snow"
              value={form.content}
              onChange={handleContentChange}
              modules={editorModules}
              formats={editorFormats}
              className="bg-white rounded-xl"
              style={{ height: '400px', marginBottom: '50px' }}
            />
            <p className="text-xs text-gray-500 mt-2">
              💡 Tip: Use the toolbar to format text, add links, images, and more!
            </p>
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-semibold text-gray-700">Publish immediately</span>
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
                className="w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
              />
              <span className="text-sm font-semibold text-gray-700">Mark as featured</span>
            </label>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white font-semibold rounded-xl hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : (isEditing ? 'Update Blog' : 'Add Blog')}
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
                key={b._id}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden bg-gray-100">
                  {b.image ? (
                    <img
                      src={b.image}
                      alt={b.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect fill="%23f3f4f6" width="400" height="300"/%3E%3Ctext fill="%239ca3af" font-family="Arial" font-size="16" x="50%25" y="50%25" text-anchor="middle" dominant-baseline="middle"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
                      <div className="text-center">
                        <svg className="w-16 h-16 text-gray-300 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs text-gray-400">No cover image</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                      {b.category || 'General'}
                    </span>
                    <div className="flex items-center gap-2">
                      {b.featured && (
                        <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">⭐ Featured</span>
                      )}
                      <span className={`text-xs px-2 py-1 rounded-full ${b.published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                        {b.published ? '✓ Published' : 'Draft'}
                      </span>
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{b.title}</h2>
                  <p className="text-base sm:text-lg font-medium text-gray-600 mb-4 line-clamp-3">{b.summary}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 gap-2">
                    <button
                      onClick={() => togglePublished(b)}
                      className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      {b.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => editBlog(b)}
                      className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeBlog(b._id)}
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
