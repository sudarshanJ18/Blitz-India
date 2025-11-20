import React from 'react';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 overflow-hidden min-h-screen flex items-center">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-30"></div>
        
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 sm:space-y-6 z-10">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/10 border border-orange-500/20 rounded-full backdrop-blur-sm animate-fade-in shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-600"></span>
              </span>
              <span className="text-base text-orange-600 font-medium">Trusted by 50+ Global Companies</span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in-up">
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent animate-gradient">Accelerate Your</span>
                <span className="block bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent animate-gradient">
                  PRODUCT Development
                </span>
              </h1>
              {/* <p className="text-base sm:text-lg text-gray-600 max-w-xl animate-fade-in-up delay-100">
                Design • QA • Analysis for reliable launches.
              </p> */}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 animate-fade-in-up delay-200">
              <a
                href="/services"
                className="group inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-600/30 border border-orange-600/20"
              >
                Explore Our Services
                <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="/contact"
                className="group inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 text-sm font-semibold rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-300 transform hover:scale-105 shadow-sm"
              >
                Get In Touch
                <svg className="ml-2 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4 pt-4 sm:pt-6">
              <div className="group text-center p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white hover:border-orange-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">500+</div>
                <div className="text-base font-medium text-gray-600 mt-1">Projects Completed</div>
              </div>
              <div className="group text-center p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white hover:border-orange-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">50+</div>
                <div className="text-base font-medium text-gray-600 mt-1">Global Clients</div>
              </div>
              <div className="group text-center p-2 sm:p-3 rounded-xl bg-white/60 backdrop-blur-sm border border-gray-200 shadow-sm hover:bg-white hover:border-orange-500/50 hover:shadow-lg transition-all duration-300 cursor-pointer">
                <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">10+</div>
                <div className="text-base font-medium text-gray-600 mt-1">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Right Content - Visual */}
          <div className="relative animate-fade-in-up delay-400 mt-6 lg:mt-0">
            {/* Main card */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl border border-gray-200 h-64 sm:h-80 md:h-96 flex items-center justify-center group hover:border-orange-500/50 hover:shadow-2xl transition-all duration-500">
              {/* Inner glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative text-center space-y-3 sm:space-y-4 p-4 sm:p-6 z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-orange-600 via-orange-700 to-gray-700 bg-clip-text text-transparent animate-gradient">
                    Blitz India
                  </span>
                </div>
                <div className="space-y-2">
                  <p className="text-xl sm:text-2xl md:text-4xl text-gray-500 font-bold animate-fade-in-up delay-600">
                    ENGINEERING 
                  </p>
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
                      <span>Since 2015</span>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-orange-600 to-transparent"></div>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
        <div className="flex flex-col items-center gap-2 text-gray-500 hover:text-orange-600 transition-colors cursor-pointer">
          <span className="text-xs font-medium">Scroll Down</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .delay-100 {
          animation-delay: 0.15s;
        }
        
        .delay-200 {
          animation-delay: 0.3s;
        }
        
        .delay-300 {
          animation-delay: 0.45s;
        }
        
        .delay-400 {
          animation-delay: 0.6s;
        }
        
        .delay-600 {
          animation-delay: 0.9s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float 4s ease-in-out 2s infinite;
        }

        @media (max-width: 640px) {
          @keyframes float {
            0%, 100% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;