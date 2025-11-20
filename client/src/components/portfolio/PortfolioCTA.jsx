import React from 'react';
import { Link } from 'react-router-dom';

const PortfolioCTA = () => {
  return (
    <section className="py-16 md:py-20 bg-white text-gray-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-2  sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 
               bg-gradient-to-r from-orange-600 to-orange-700 
               bg-clip-text text-transparent 
               px-4 py-2 md:px-6 md:py-3 lg:px-8 lg:py-4">
            Ready to Add Your Project to Our Portfolio?
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
            Join our growing list of satisfied clients and let's create something extraordinary together. 
            Your success story could be the next one we showcase.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/30 border border-orange-600/20"
            >
              Start Your Project
              <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              to="/services"
              className="group inline-flex items-center justify-center px-8 py-4 text-base font-semibold rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-orange-300 hover:text-orange-600 transition-all duration-300 transform hover:scale-105"
            >
              Explore Our Services
              <svg className="ml-2 w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* What to Expect */}
          <div className="bg-gray-50 rounded-2xl p-8 md:p-10 mb-8 border border-gray-200">
            <h3 className="text-2xl md:text-3xl font-bold mb-8 text-gray-900">What to Expect When You Work With Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Free Consultation</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">We'll discuss your project requirements and provide expert recommendations.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Detailed Proposal</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Receive a comprehensive proposal with timeline, costs, and deliverables.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-gray-900">Project Execution</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">Regular updates and collaboration throughout the project lifecycle.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
            <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Visit Us</h3>
              <p className="text-gray-600 text-sm">Pune, India</p>
              <p className="text-gray-600 text-sm">Serving Globally</p>
            </div>
            
            <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Call Us</h3>
              <p className="text-gray-600 text-sm">+91-123-456-7890</p>
              <p className="text-gray-600 text-sm">+1-555-123-4567</p>
            </div>
            
            <div className="flex flex-col items-center bg-white p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mb-4 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2 text-gray-900">Email Us</h3>
              <p className="text-gray-600 text-sm">info@blitzindiaengineering.com</p>
              <p className="text-gray-600 text-sm">projects@blitzindiaengineering.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTA;