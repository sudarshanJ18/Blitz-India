import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 overflow-hidden border-t border-gray-200">
      {/* Animated Background Effect */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
          {/* Company Info */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold bg-gradient-to-r px-2 py-1 from-orange-600 to-orange-700 bg-clip-text text-transparent">
              Blitz India Engineering
            </h2>
            <p className="text-lg text-gray-700 font-medium">
              Accelerating Product Development since 2015
            </p>
            <p className="text-gray-600">
              Transforming ideas into reality with cutting-edge engineering solutions
            </p>
          </div>

          {/* Policy Links */}
          <div className="flex flex-col md:items-end space-y-3">
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/privacy-policy" 
                className="group relative px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-300 hover:border-orange-500 shadow-sm hover:shadow-md"
              >
                <span className="relative z-10 text-gray-700 group-hover:text-orange-600">Privacy Policy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity"></div>
              </Link>
              <Link 
                to="/terms-of-service" 
                className="group relative px-4 py-2 bg-white hover:bg-gray-50 rounded-lg transition-all duration-300 border border-gray-300 hover:border-orange-500 shadow-sm hover:shadow-md"
              >
                <span className="relative z-10 text-gray-700 group-hover:text-orange-600">Terms of Service</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-500 rounded-lg opacity-0 group-hover:opacity-5 transition-opacity"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-3 text-gray-500 text-sm">
          <p className="flex items-center gap-2">
            <span className="text-orange-600">©</span>
            {new Date().getFullYear()} Blitz India Engineering. All rights reserved.
          </p>
          
          {/* Contact Info */}
          <div className="flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 9158575785</span>
            </div>
            <div className="flex items-center gap-2">
              <a 
  href="mailto:info@blitzindiaengineering.com" 
  className="flex items-center gap-2 hover:underline"
>
              <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>info@blitzindiaengineering.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="h-1 bg-gradient-to-r from-orange-500 via-orange-600 to-orange-500"></div>
    </footer>
  );
};

export default Footer;