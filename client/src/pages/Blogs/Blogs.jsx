import React from 'react';
import { blogPosts } from '../../data/blogPosts.js';
import BlogHeader from '../../components/blog/BlogHeader.jsx';
import FeaturedPost from '../../components/blog/FeaturedPost.jsx';
import PostList from '../../components/blog/PostList.jsx';
import BlogCTA from '../../components/blog/BlogCTA.jsx';

const Blogs = () => {
  return (
      <div className="">
        <div className="">
          <div className="text-center mb-16">
            
              <BlogHeader />
             
           
          </div>

          <div className="mb-16">
            <FeaturedPost />
          </div>

          <div className="mb-16">
            <PostList />
          </div>

          <div className="mb-16">
            <BlogCTA />
          </div>
        </div>
      </div>
  );
};

export default Blogs;