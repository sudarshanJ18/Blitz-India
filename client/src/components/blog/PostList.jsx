import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts.js';

const DEFAULT_VISIBLE_COUNT = 6;

const PostList = () => {
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(DEFAULT_VISIBLE_COUNT);

  const categories = useMemo(() => {
    const unique = new Map();
    unique.set('all', 'All');
    blogPosts.forEach((post) => {
      if (!unique.has(post.category.slug)) {
        unique.set(post.category.slug, post.category.name);
      }
    });
    return Array.from(unique.entries());
  }, []);

  const filteredPosts = useMemo(() => {
    if (filter === 'all') return blogPosts;
    return blogPosts.filter((post) => post.category.slug === filter);
  }, [filter]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  const handleLoadMore = () => setVisibleCount((count) => count + DEFAULT_VISIBLE_COUNT);

  const formatDate = (isoDate) =>
    new Date(isoDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <section className="py-16 bg-white" aria-labelledby="blog-posts-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 mb-12">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">Articles</p>
              <h2 id="blog-posts-heading" className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Engineering Articles
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Deep dive into technical topics and industry insights from our engineering experts.
              </p>
            </div>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter posts by category">
              {categories.map(([slug, name]) => (
                <button
                  key={slug}
                  type="button"
                  onClick={() => {
                    setFilter(slug);
                    setVisibleCount(DEFAULT_VISIBLE_COUNT);
                  }}
                  role="tab"
                  aria-selected={filter === slug}
                  className={`px-4 py-2 text-sm font-bold rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
                    filter === slug
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:text-gray-900'
                  }`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 lg:grid-cols-3">
            {visiblePosts.map((post) => (
              <article key={post.id} className="flex flex-col items-start justify-between" aria-labelledby={`post-${post.id}`}>
                <div className="relative w-full">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="aspect-video w-full rounded-2xl bg-gray-200 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-200/50" aria-hidden="true" />
                </div>
                <div className="max-w-xl">
                  <div className="mt-6 flex items-center gap-x-4 text-base sm:text-lg font-medium text-gray-500">
                    <time dateTime={post.date}>{formatDate(post.date)}</time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                    <Link
                      to={`/blog/${post.slug}`}
                      className="relative z-10 rounded-full bg-orange-50 px-3 py-1.5 font-medium text-orange-600 hover:bg-orange-100 transition-colors duration-200"
                    >
                      {post.category.name}
                    </Link>
                  </div>
                  <div className="group relative">
                    <h3 id={`post-${post.id}`} className="mt-3 text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors duration-200">
                      <Link to={`/blog/${post.slug}`}>
                        <span className="absolute inset-0" aria-hidden="true" />
                        {post.title}
                      </Link>
                    </h3>
                    <p className="mt-5 line-clamp-3 text-base sm:text-lg font-medium text-gray-600">{post.excerpt}</p>
                  </div>
                  <div className="relative mt-6 flex items-center gap-x-4">
                    <img
                      src={post.author.avatarUrl}
                      alt={`${post.author.name} avatar`}
                      className="h-10 w-10 rounded-full bg-gray-200 object-cover"
                      loading="lazy"
                    />
                    <div className="text-sm">
                      <p className="font-bold text-gray-900">
                        <Link to={`/blog/${post.slug}`}>
                          <span className="absolute inset-0" aria-hidden="true" />
                          {post.author.name}
                        </Link>
                      </p>
                      <p className="text-gray-500">{post.author.role}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {!visiblePosts.length && (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No articles found in this category just yet. Please check back soon.</p>
            </div>
          )}

          {hasMore && (
            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={handleLoadMore}
                className="inline-flex items-center gap-2 px-6 py-3 border border-orange-600 text-base font-bold rounded-full text-orange-600 bg-white hover:bg-orange-600 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
              >
                Load More Articles
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PostList;