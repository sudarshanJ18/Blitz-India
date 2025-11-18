import React, { useState } from 'react';

const ContactMap = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-white via-gray-50 to-orange-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-left">
            Find Us in <span className="text-orange-600">Pune, India</span>
          </h2>
          
        </div>

        <div className="relative bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Map Container with Enhanced Styling */}
          <div className="relative h-[500px] w-full">
            {/* Loading Overlay */}
            {!isLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center z-10">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">Loading Map...</p>
                </div>
              </div>
            )}

            {/* Enhanced Google Maps Embed */}
            <div className="relative h-full w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.265588856342!2d73.856743!3d18.5204303!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1690000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ 
                  border: 0,
                  filter: isLoaded ? 'saturate(1.1) contrast(1.1)' : 'none',
                  transition: 'filter 0.5s ease-in-out'
                }}
                allowFullScreen=""
                loading="lazy"
                title="Blitz India Engineering - Pune Office"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setIsLoaded(true)}
              ></iframe>
            </div>

            {/* Custom Location Marker */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <div className="relative">
                {/* Pulsing Animation */}
                <div className="absolute inset-0">
                  <div className="w-8 h-8 bg-orange-500 rounded-full animate-ping opacity-20"></div>
                </div>
                
                {/* Main Marker */}
                <div className="relative bg-white rounded-full p-2 shadow-2xl border border-orange-300 transform hover:scale-110 transition-transform duration-300 cursor-pointer group">
                  <div className="w-6 h-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                    <div className="bg-gray-900 text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap mb-2">
                      <div className="font-semibold">Blitz India Engineering</div>
                      <div className="text-gray-300">Pune, Maharashtra</div>
                    </div>
                    <div className="w-3 h-3 bg-gray-900 transform rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Info Card */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-gray-200 max-w-xs z-10">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Pune Office</h3>
                  <p className="text-sm text-gray-600 mt-1">Engineering Hub of India</p>
                  <div className="mt-2 space-y-1">
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +91 9158575785
                    </p>
                    <p className="text-xs text-gray-500 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      info@blitzindiaengineering.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Zoom Controls */}
            <div className="absolute top-6 right-6 flex flex-col gap-2 z-10">
              <button
                onClick={() => {
                  const iframe = document.querySelector('iframe');
                  // You can add custom zoom logic here if needed
                }}
                className="w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
              <button
                className="w-10 h-10 bg-white rounded-lg shadow-md border border-gray-200 flex items-center justify-center text-gray-700 hover:text-orange-600 hover:border-orange-300 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6" />
                </svg>
              </button>
            </div>
          </div>

          
        </div>
      </div>
    </section>
  );
};

export default ContactMap;