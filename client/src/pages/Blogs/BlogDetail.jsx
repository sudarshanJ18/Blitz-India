import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../../data/blogPosts.js';

const BlogDetail = () => {
  const { slug } = useParams();
  const post = blogPosts.find(post => post.slug === slug);

  if (!post) {
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
    <div className="min-h-screen bg-white">
      {/* Blog Header */}
      <div className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
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

          {/* Category Badge */}
          <div className="mb-4">
            <span className="inline-block px-4 py-2 bg-orange-500/10 text-orange-600 text-sm font-bold rounded-full border border-orange-500/20">
              {post.category.name}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight sm:leading-relaxed lg:leading-snug mb-6">
            {post.title}
          </h1>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-4 text-gray-600 mb-8">
            <div className="flex items-center">
              <img
                src={post.author.avatarUrl}
                alt={`${post.author.name} avatar`}
                className="h-10 w-10 rounded-full object-cover mr-3"
                loading="lazy"
              />
              <div>
                <p className="font-semibold text-gray-900">{post.author.name}</p>
                <p className="text-sm">{post.author.role}</p>
              </div>
            </div>
            <span className="hidden sm:block">•</span>
            <span>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            <span>•</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </div>

      {/* Blog Content */}
      <div className="pb-16 sm:pb-20 lg:pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Featured Image */}
          <div className="mb-12 rounded-2xl overflow-hidden shadow-lg">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-64 sm:h-80 md:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <article className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              {post.excerpt}
            </p>
            
            <div className="mt-12 space-y-6 text-gray-700">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. 
                Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus 
                rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna 
                non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Understanding the Fundamentals</h2>
              
              <p>
                Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Cras mattis 
                consectetur purus sit amet fermentum. Sed posuere consectetur est at lobortis. 
                Integer posuere erat a ante venenatis dapibus posuere velit aliquet. Nullam 
                quis risus eget urna mollis ornare vel eu leo.
              </p>
              
              <blockquote className="border-l-4 border-orange-500 pl-6 italic text-gray-700 my-8">
                "The key to successful engineering is understanding both the technical and 
                human aspects of problem-solving. It's not just about the calculations; 
                it's about creating solutions that work in the real world."
              </blockquote>
              
              <p>
                Praesent commodo cursus magna, vel scelerisque nisl consectetur et. 
                Donec ullamcorper nulla non metus auctor fringilla. Cras justo odio, 
                dapibus ac facilisis in, egestas eget quam. Vestibulum id ligula porta 
                felis euismod semper.
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 mt-10 mb-4">Practical Implementation</h2>
              
              <p>
                Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, 
                ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna 
                mollis euismod. Donec sed odio dui. Sed posuere consectetur est at lobortis.
              </p>
              
              <ul className="list-disc pl-6 space-y-2 mt-6">
                <li>Focus on iterative design and testing</li>
                <li>Prioritize user feedback throughout development</li>
                <li>Implement robust quality assurance processes</li>
                <li>Maintain detailed documentation for future reference</li>
                <li>Continuously evaluate and optimize performance</li>
              </ul>
              
              <p>
                Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare 
                sem lacinia quam venenatis vestibulum. Nullam quis risus eget urna mollis 
                ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient 
                montes, nascetur ridiculus mus.
              </p>
            </div>
          </article>

          {/* Tags */}
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
                {post.category.name}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;