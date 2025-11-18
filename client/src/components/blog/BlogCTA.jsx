import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const BlogCTA = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email) return;

    // This is a placeholder for future API integration.
    setStatus('Thanks for subscribing! We will keep you updated.');
    setEmail('');
  };

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
        <form className="mt-8 sm:flex justify-center" onSubmit={handleSubmit} noValidate>
          <label htmlFor="email-address" className="sr-only">
            Email address
          </label>
          <input
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full px-5 py-3 border border-gray-300 shadow-sm placeholder-gray-500 focus:ring-1 focus:ring-orange-600 focus:border-orange-600 sm:max-w-xs rounded-md text-gray-900"
            placeholder="Enter your email"
          />
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-bold rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Subscribe
            </button>
          </div>
        </form>
        {status && <p className="mt-4 text-sm text-green-600" role="status">{status}</p>}
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