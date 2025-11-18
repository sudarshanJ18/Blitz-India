import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: 'general-inquiry',
    message: '',
    attachment: null,
    consent: false
  });

  const [formStatus, setFormStatus] = useState({ submitted: false, error: null });

  const services = [
    { id: 'general-inquiry', name: 'General Inquiry' },
    { id: '2d-drafting', name: '2D Drafting' },
    { id: '3d-modeling', name: '3D Modeling' },
    { id: 'fea-analysis', name: 'FEA Analysis' },
    { id: 'cfd-analysis', name: 'CFD Analysis' },
    { id: 'reverse-engineering', name: 'Reverse Engineering' },
    { id: 'prototype-development', name: 'Prototype Development' },
    { id: 'other', name: 'Other' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: null });

    if (!formData.consent) {
      setFormStatus({ submitted: false, error: "You must agree to the privacy policy." });
      return;
    }

    // Simulate form submission
    console.log("Form Data:", formData);
    setTimeout(() => {
      setFormStatus({ submitted: true, error: null });
      setFormData({
        name: '', email: '', phone: '', company: '', service: 'general-inquiry', 
        message: '', attachment: null, consent: false
      });
    }, 1000);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>
      
      {formStatus.submitted && (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-6" role="alert">
          <strong className="font-medium">Success!</strong>
          <span className="block sm:inline"> Your message has been sent. We will get back to you shortly.</span>
        </div>
      )}

      {formStatus.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <strong className="font-medium">Error!</strong>
          <span className="block sm:inline"> {formStatus.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter your phone number"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">Company (Optional)</label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">Service of Interest</label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800"
          >
            {services.map(service => (
              <option key={service.id} value={service.id}>{service.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Your Message</label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent bg-white text-gray-800 placeholder-gray-500"
            placeholder="Tell us about your project or inquiry..."
          ></textarea>
        </div>

        <div>
          <label htmlFor="attachment" className="block text-sm font-medium text-gray-700 mb-2">Attach File (Optional)</label>
          <input
            type="file"
            id="attachment"
            name="attachment"
            onChange={handleChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
          />
          <p className="text-xs text-gray-500 mt-2">Max file size: 5MB. Allowed types: PDF, DOCX, JPG, PNG.</p>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            className="h-4 w-4 text-gray-600 border-gray-300 rounded focus:ring-gray-500 mt-1"
          />
          <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
            I agree to the <a href="/privacy-policy" className="font-medium text-gray-700 hover:text-gray-900 underline">Privacy Policy</a> and consent to have my data processed for this inquiry.
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-gray-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;