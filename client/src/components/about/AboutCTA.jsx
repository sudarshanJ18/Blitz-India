import React from 'react';
import { Link } from 'react-router-dom';

const AboutCTA = () => {
  return (
    <section className="min-h-screen flex items-center py-16 md:py-20 lg:py-24 bg-gray-800 "> 
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Box */}
        <div className="bg-gray-800 text-white p-8 md:p-12 lg:p-20 relative overflow-hidden">
          {/* Decorative Elements */}
          {/* <div className="absolute top-0 right-0 w-48 h-48 md:w-64 md:h-64 bg-orange-600 opacity-10 rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 md:w-64 md:h-64 bg-orange-600 opacity-10 rounded-full translate-y-1/2 -translate-x-1/2"></div> */}
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-tight mb-6 md:mb-8">
              PARTNER WITH US
              <br />
              TO BRING YOUR
              <br />
              <span className="text-orange-600">VISION TO LIFE</span>
            </h2>
            
            <p className="text-base md:text-xl text-gray-300 max-w-3xl mb-8 md:mb-12 leading-relaxed">
              Ready to leverage our expertise for your next project? Contact us today for a free consultation 
              and discover how Blitz India Engineering can be your trusted partner in innovation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-12 md:mb-16">
              <Link
                to="/contact"
                className="inline-block bg-orange-600 text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-black uppercase hover:bg-white hover:text-orange-600 transition-colors duration-300 text-center"
              >
                Get a Free Consultation
              </Link>
              <Link
                to="/services"
                className="inline-block border-2 border-white text-white px-8 md:px-10 py-3 md:py-4 text-base md:text-lg font-black uppercase hover:bg-white hover:text-gray-800 transition-colors duration-300 text-center"
              >
                Explore Our Services
              </Link>
            </div>

            {/* Additional Links */}
            <div className="border-t border-gray-700 pt-6 md:pt-8">
              <p className="text-gray-400 mb-4 md:mb-6 text-xs md:text-sm uppercase tracking-wider">
                Or, learn more about our work
              </p>
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-8">
                <Link
                  to="/portfolio"
                  className="text-white hover:text-orange-600 font-bold uppercase transition-colors duration-300 flex items-center gap-2 text-sm md:text-base"
                >
                  View Our Portfolio
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link
                  to="/blogs"
                  className="text-white hover:text-orange-600 font-bold uppercase transition-colors duration-300 flex items-center gap-2 text-sm md:text-base"
                >
                  Read Our Blog
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;