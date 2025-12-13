import React from 'react';
import { Link } from 'react-router-dom';

const BlogCTA = () => {
  return (
    <section className="bg-white" aria-labelledby="newsletter-heading">
      <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-orange-600">Newsletter</p>
        <h2 id="newsletter-heading" className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl">
          Stay Ahead of the Curve
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Subscribe to receive the latest insights in engineering and technology, curated by our experts.
        </p>

        {/* Substack Newsletter Embed */}
        <div className="mt-8 flex justify-center">
          <iframe
            src="https://sudarshanreddy1.substack.com/embed"
            width="480"
            height="150"
            style={{
              border: '1px solid #EEE',
              background: 'white'
            }}
            frameBorder="0"
            scrolling="no"
            title="Substack Newsletter"
            className="w-full max-w-md mx-auto" ></iframe>
        </div>

        <p className="mt-8 text-base text-gray-600">
          Have a project in mind?{' '}
          <Link to="/contact" className="font-bold text-orange-600 hover:text-orange-700">
            Get in touch
          </Link>
        </p>
      </div>
    </section>
  );
};

export default BlogCTA;