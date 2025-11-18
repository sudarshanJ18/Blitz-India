import React from 'react';
import { Link } from 'react-router-dom';

const ServicesCTA = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Section */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="inline-block mb-4">
            {/* <span className="px-4 py-2 bg-orange-500/10 text-orange-500 text-sm font-bold rounded-full border border-orange-500/20">
              Get Started Today
            </span> */}
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
            Ready to Start Your{' '}
            <span className="text-orange-500">Next Project?</span>
          </h2>
          
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Let's discuss your engineering requirements and how we can help bring your vision to life with our expert services.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-8 py-4 bg-orange-500 text-white text-base font-semibold rounded-full hover:bg-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Get Free Consultation
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              to="/portfolio"
              className="group inline-flex items-center justify-center px-8 py-4 border-2 border-gray-300 text-black text-base font-semibold rounded-full hover:border-orange-500 hover:text-orange-500 bg-white transition-all duration-300 hover:scale-105"
            >
              View Our Portfolio
              <svg 
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

       

      </div>
    </section>
  );
};

export default ServicesCTA;