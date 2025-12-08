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
          <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 
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
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-8 text-gray-900">What to Expect When You Work With Us</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left">
              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">1</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-xl text-gray-900">Free Consultation</h4>
                  <p className="text-gray-600 text-s font-medium pt-1 md:pt-2 leading-relaxed">We'll discuss your project requirements and provide expert recommendations.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">2</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-xl text-gray-900">Detailed Proposal</h4>
                  <p className="text-gray-600 text-s font-medium pt-1 md:pt-2 leading-relaxed">Receive a comprehensive proposal with timeline, costs, and deliverables.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 bg-white p-6 rounded-xl hover:shadow-md transition-all border border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-sm font-bold text-white">3</span>
                </div>
                <div>
                  <h4 className="font-semibold mb-2 text-xl text-gray-900">Project Execution</h4>
                  <p className="text-gray-600 text-s font-medium pt-1 md:pt-2 leading-relaxed">Regular updates and collaboration throughout the project lifecycle.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center mb-10 md:mb-12">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Get In Touch
              </h2>
              {/* <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Ready to start your next project? We're here to help you achieve engineering excellence.
              </p> */}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Visit Us Card */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">Visit Us</h3>

                <div className="space-y-3">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Headquarters</p>
                      <p className="text-gray-600">Pune, Maharashtra, India</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-orange-500 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <p className="text-lg font-semibold text-gray-800">Global Presence</p>
                      <p className="text-gray-600">Serving Clients Worldwide</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Visit our office for detailed project discussions</p>
                </div>
              </div>

              {/* Call Us Card */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">Call Us</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-200 group-hover:bg-orange-100 transition-colors">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-600">Primary</p>
                        <p className="text-xl font-bold text-gray-900">+91-98765-43210</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-colors">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </span>
                      <div>
                        <p className="text-sm font-medium text-gray-600">International</p>
                        <p className="text-xl font-bold text-gray-900">+1-555-123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Available 24/7 for urgent project inquiries</p>
                </div>
              </div>

              {/* Email Us Card */}
              <div className="group relative bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl border border-gray-200 hover:border-orange-300 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-4 h-4 bg-orange-500 rounded-full animate-ping"></div>
                </div>

                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>

                <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-orange-600 transition-colors">Email Us</h3>

                <div className="space-y-4">
                  <a href="mailto:info@blitzindiaengineering.com" className="block p-4 bg-orange-50 rounded-xl border border-orange-200 group-hover:bg-orange-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">General Inquiries</p>
                        <p className="text-lg font-bold text-gray-900 break-all">info@blitzindiaengineering.com</p>
                      </div>
                      <svg className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </a>

                  <a href="mailto:projects@blitzindiaengineering.com" className="block p-4 bg-gray-50 rounded-xl border border-gray-200 group-hover:bg-gray-100 transition-all duration-300 hover:shadow-md">
                    <div className="flex items-center">
                      <span className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                        </svg>
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-600">Project Proposals</p>
                        <p className="text-lg font-bold text-gray-900 break-all">projects@blitzindiaengineering.com</p>
                      </div>
                      <svg className="w-5 h-5 text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-sm text-gray-500">Typically respond within 2-4 business hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioCTA;