import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogsService from '../../services/blogs.service';
import Loader from '../common/Loader';

const FeaturedPost = ({ limit = 3 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedBlogs = async () => {
      try {
        setLoading(true);
        const allBlogs = await blogsService.getAllBlogs();
        // Filter for featured blogs and limit the results
        const featured = allBlogs.filter(blog => blog.featured).slice(0, limit);
        setPosts(featured);
      } catch (error) {
        console.error('Error fetching featured blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedBlogs();
  }, [limit]);

  if (loading) {
    return (
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Loader size={60} color="#ea580c" />
          </div>
        </div>
      </section>
    );
  }

  if (!posts.length) {
    return null;
  }

  return (
    <section className="bg-white py-16 sm:py-24" aria-labelledby="featured-posts-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">Featured</p>
          <h2 id="featured-posts-heading" className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Engineering Insights
          </h2>
          <p className="mt-3 text-lg text-gray-600">
            Stay updated with the latest trends, technologies, and innovations in engineering and manufacturing.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-12 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id} className="flex max-w-xl flex-col items-start justify-between" aria-labelledby={`featured-${post._id}`}>
              <div className="flex items-center gap-x-4 text-base sm:text-lg font-medium text-gray-500">
                <time dateTime={post.publishedDate}>{new Date(post.publishedDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
                <Link
                  to={`/blogs/${post.slug}`}
                  className="relative z-10 rounded-full bg-orange-50 px-3 py-1.5 font-medium text-orange-600 hover:bg-orange-100 transition-colors duration-200"
                >
                  {post.category || 'Engineering'}
                </Link>
              </div>

              <div className="group relative grow">
                <h3 id={`featured-${post._id}`} className="mt-3 text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                  <Link to={`/blogs/${post.slug}`}>
                    <span className="absolute inset-0" aria-hidden="true" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-5 line-clamp-3 text-base sm:text-lg font-medium text-gray-600">{post.summary}</p>
              </div>

              <div className="relative mt-8 flex items-center gap-x-4">
                <div className="size-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">
                  {(post.author || 'B')[0].toUpperCase()}
                </div>
                <div className="text-sm">
                  <p className="font-bold text-gray-900">
                    <Link to={`/blogs/${post.slug}`}>
                      <span className="absolute inset-0" aria-hidden="true" />
                      {post.author || 'Blitz India Engineering'}
                    </Link>
                  </p>
                  <p className="text-gray-500">{post.authorRole || 'Engineering Team'}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 rounded-full border border-orange-600 px-6 py-3 text-base font-bold text-orange-600 hover:bg-orange-600 hover:text-white transition-colors duration-200"
          >
            View All Articles
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPost;