import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import blogsService from '../../services/blogs.service';
import 'react-quill-new/dist/quill.snow.css';
import Loader from '../../components/common/Loader';

const BlogDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [scrollY, setScrollY] = useState(0);
  const [imageSize, setImageSize] = useState(250);
  const [blur, setBlur] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogData = await blogsService.getBlogBySlug(slug);
        setPost(blogData);
        setError(null);
      } catch (err) {
        console.error('Error fetching blog:', err);
        setError('Blog post not found');
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      const fromTop = window.scrollY;
      setScrollY(fromTop);

      
      const newSize = 250 - (fromTop / 3);
      if (newSize > 100) {
        setImageSize(newSize);
      } else {
        setImageSize(100);
      }

      
      const newBlur = fromTop / 100;
      setBlur(newBlur);

      
      const newOpacity = 1 - (fromTop / 800);
      setOpacity(newOpacity > 0 ? newOpacity : 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader size={60} color="#ea580c" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <Link to="/blogs" className="text-orange-600 hover:text-orange-700 font-medium">
            ← Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      
      <div
        className="fixed top-0 left-0 right-0 z-0 overflow-hidden"
        style={{
          paddingTop: '50vh',
          backgroundImage: `url(${post.image?.startsWith('/uploads') ? `${import.meta.env.VITE_API_URL || 'http://localhost:5000'}${post.image}` : (post.image || 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=1200&q=80')})`,
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: `${imageSize}%`,
          filter: `blur(${blur}px)`,
          opacity: opacity,
          boxShadow: '0 -50px 20px -20px #111827 inset',
          transition: 'none'
        }}
      />

      
      <div className="relative z-10 pt-[45vh] md:pt-[35vh] bg-transparent">
        
        <div className="bg-white rounded-t-3xl shadow-2xl">
          
          <div className="pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <div className="mb-6">
                <Link
                  to="/blogs"
                  className="inline-flex items-center text-gray-600 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base"
                >
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back to Blogs
                </Link>
              </div>

              
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-orange-500/10 text-orange-600 text-sm font-bold rounded-full border border-orange-500/20">
                  {post.category || 'Engineering'}
                </span>
              </div>

              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-relaxed lg:leading-snug mb-6">
                {post.title}
              </h1>

              
              <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold mr-3">
                    {(post.author || 'B')[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{post.author || 'Blitz India Engineering'}</p>
                    <p className="text-sm">{post.authorRole || 'Engineering Team'}</p>
                  </div>
                </div>
                <span className="hidden sm:block">•</span>
                <span>{new Date(post.publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span>•</span>
                <span>{post.readTime || '5 min read'}</span>
              </div>
            </div>
          </div>

          
          <div className="pb-16 sm:pb-20 lg:pb-24">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              
              <article className="max-w-none">
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                  {post.summary}
                </p>

                <div
                  className="ql-editor mt-12 prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: (() => {
                      try {
                        const txt = document.createElement("textarea");
                        txt.innerHTML = post.content || '';
                        return txt.value;
                      } catch (e) {
                        return post.content || '';
                      }
                    })()
                  }}
                />
              </article>

              
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    Engineering
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    Innovation
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    Best Practices
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                    {post.category || 'Technology'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;