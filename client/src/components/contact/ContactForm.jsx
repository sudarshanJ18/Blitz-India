import React, { useState, useEffect } from 'react';
import SuccessPopup from '../common/SuccessPopup';
import { Loader2 } from 'lucide-react';
import axios from 'axios';

const ContactForm = () => {
  const [categories, setCategories] = useState([]);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    serviceCategory: '',
    serviceSubcategory: '',
    message: '',
    attachment: null,
    consent: false
  });

  const [formStatus, setFormStatus] = useState({ submitted: false, error: null, loading: false });
  const [showPopup, setShowPopup] = useState(false);

  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [categoriesRes, servicesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/api/services/categories`),
          axios.get(`${import.meta.env.VITE_API_URL}/api/services`)
        ]);
        setCategories(categoriesRes.data.data || []);
        setServices(servicesRes.data.data || []);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  
  const getSubcategories = () => {
    if (!formData.serviceCategory) return [];
    const category = categories.find(cat => cat.title === formData.serviceCategory);
    if (!category) return [];
    return services.filter(s => s.categoryId === category.categoryId);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    
    if (name === 'serviceCategory') {
      setFormData(prev => ({
        ...prev,
        serviceCategory: value,
        serviceSubcategory: '' 
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : (type === 'file' ? files[0] : value)
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ submitted: false, error: null, loading: true });

    
    if (!formData.consent) {
      setFormStatus({ submitted: false, error: "You must agree to the privacy policy to continue.", loading: false });
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.serviceCategory || !formData.message) {
      setFormStatus({ submitted: false, error: "Please fill in all required fields.", loading: false });
      return;
    }

    try {
      
      const submitData = new FormData();
      submitData.append('name', formData.name);
      submitData.append('email', formData.email);
      submitData.append('phone', formData.phone);
      submitData.append('serviceCategory', formData.serviceCategory);
      submitData.append('message', formData.message);
      submitData.append('consent', formData.consent);

      
      if (formData.company && formData.company.trim()) {
        submitData.append('company', formData.company);
      }
      if (formData.serviceSubcategory) {
        submitData.append('serviceSubcategory', formData.serviceSubcategory);
      }
      if (formData.attachment) {
        submitData.append('attachment', formData.attachment);
      }

      
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/contact`, {
        method: 'POST',
        body: submitData
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setFormStatus({ submitted: true, error: null, loading: false });
        setShowPopup(true);

        
        setFormData({
          name: '', email: '', phone: '', company: '', serviceCategory: '',
          serviceSubcategory: '', message: '', attachment: null, consent: false
        });
        
        const fileInput = document.getElementById('attachment');
        if (fileInput) fileInput.value = '';
      } else {
        let errorMsg = result.message || 'Failed to submit form. Please try again.';
        if (result.errors && Array.isArray(result.errors)) {
          errorMsg = result.errors.map(err => `${err.field || err.path}: ${err.message}`).join(', ');
        }
        setFormStatus({
          submitted: false,
          error: errorMsg,
          loading: false
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setFormStatus({
        submitted: false,
        error: 'Network error. Please check your connection and try again.',
        loading: false
      });
    }
  };

  const subcategories = getSubcategories();

  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 relative">
      <SuccessPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        message="Thank you for reaching out! We have received your message and will get back to you shortly."
      />

      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-800 mb-6">Send Us a Message</h2>

      {formStatus.error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6" role="alert">
          <strong className="font-medium">Error!</strong>
          <span className="block sm:inline"> {formStatus.error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={formStatus.loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your full name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={formStatus.loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              disabled={formStatus.loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
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
              disabled={formStatus.loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
              placeholder="Enter your company name"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="serviceCategory" className="block text-sm font-medium text-gray-700 mb-2">
              Service Category <span className="text-red-500">*</span>
            </label>
            <select
              id="serviceCategory"
              name="serviceCategory"
              value={formData.serviceCategory}
              onChange={handleChange}
              required
              disabled={formStatus.loading}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Select a service category</option>
              {categories.map(category => (
                <option key={category._id} value={category.title}>{category.title}</option>
              ))}
              <option value="General Inquiry">General Inquiry</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="serviceSubcategory" className="block text-sm font-medium text-gray-700 mb-2">
              Specific Service (Optional)
            </label>
            <select
              id="serviceSubcategory"
              name="serviceSubcategory"
              value={formData.serviceSubcategory}
              onChange={handleChange}
              disabled={formStatus.loading || !formData.serviceCategory || subcategories.length === 0}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 disabled:bg-gray-50 disabled:text-gray-500"
            >
              <option value="">Select a specific service</option>
              {subcategories.map(service => (
                <option key={service._id} value={service.title}>{service.title}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Select a category first to see specific services</p>
          </div>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Your Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            disabled={formStatus.loading}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-800 placeholder-gray-500 disabled:bg-gray-50 disabled:text-gray-500"
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
            disabled={formStatus.loading}
            accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.rar,.jpg,.jpeg,.png,.gif,.bmp,.txt,.csv,.ppt,.pptx"
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100 disabled:opacity-60"
          />
          <p className="text-xs text-gray-500 mt-2">Supported: PDF, Word, Excel, PowerPoint, Images, ZIP (Max 10MB)</p>
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="consent"
            name="consent"
            checked={formData.consent}
            onChange={handleChange}
            required
            disabled={formStatus.loading}
            className="h-4 w-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 mt-1"
          />
          <label htmlFor="consent" className="ml-3 text-sm text-gray-600">
            <span className="text-red-500">*</span> I have read and agree to the{' '}
            <a href="/privacy-policy" target="_blank" className="font-medium text-orange-600 hover:text-orange-700 underline">Privacy Policy</a>{' '}
            and consent to have my data processed for this inquiry.
          </label>
        </div>

        <div>
          <button
            type="submit"
            disabled={formStatus.loading}
            className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white px-6 py-3 rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg"
          >
            {formStatus.loading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              'Send Message'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;