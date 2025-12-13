import React from 'react';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-white to-gray-50 text-gray-900 overflow-hidden border-t border-gray-200">
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gray-300 rounded-full mix-blend-multiply filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#64748b_1px,transparent_1px),linear-gradient(to_bottom,#64748b_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start mb-12">
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-3 overflow-visible">
              <div className="inline-block">
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-4xl xl:text-4.5xl font-black uppercase tracking-tight bg-gradient-to-r from-orange-600 via-orange-500 to-orange-600 bg-clip-text text-transparent leading-tight whitespace-nowrap overflow-visible pb-1">
                  Blitz India Engineering
                </h2>
                <div className="h-1 w-full bg-gradient-to-r from-orange-600 via-orange-500 to-transparent rounded-full mt-2"></div>
              </div>
              <p className="text-sm sm:text-base uppercase text-gray-600 font-semibold tracking-[0.2em]">
                We help engineer your product
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-orange-50/50 to-transparent rounded-xl border-l-4 border-orange-500">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg flex items-center justify-center shadow-md">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-base sm:text-lg text-black font-bold">
                    Accelerating Product Development since 2015
                  </p>
                  <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">
                    Transforming ideas into reality with cutting-edge engineering solutions
                  </p>
                </div>
              </div>
            </div>

            {/* Animated Gears - Interconnected Triangle Formation */}
            <div className="flex justify-center py-8">
              <div className="relative w-80 h-36">
                <style jsx>{`
                  @keyframes rotateGearCW {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(360deg);
                    }
                  }
                  
                  @keyframes rotateGearCCW {
                    from {
                      transform: rotate(0deg);
                    }
                    to {
                      transform: rotate(-360deg);
                    }
                  }
                  
                  .gear-left {
                    will-change: transform;
                    animation: rotateGearCCW 12s linear infinite;
                  }
                  
                  .gear-center {
                    will-change: transform;
                    animation: rotateGearCW 10s linear infinite;
                  }
                  
                  .gear-right {
                    will-change: transform;
                    animation: rotateGearCCW 14s linear infinite;
                  }

                  /* Respect user's motion preferences */
                  @media (prefers-reduced-motion: reduce) {
                    .gear-left,
                    .gear-center,
                    .gear-right {
                      animation: none;
                    }
                  }
                `}</style>

                {/* Left Gear - Middle Left, Steel Gray */}
                <div className="absolute left-8 top-12 w-20 h-20">
                  <svg
                    className="gear-left w-20 h-20 text-slate-600 drop-shadow-xl"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                  </svg>
                </div>

                {/* Center Gear - Top Center, Orange (Largest - Brand Color) */}
                <div className="absolute left-1/2 -translate-x-1/2 top-0 w-28 h-28">
                  <svg
                    className="gear-center w-28 h-28 text-orange-600 drop-shadow-2xl"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                  </svg>
                </div>

                {/* Right Gear - Middle Right, Steel Gray */}
                <div className="absolute right-8 top-12 w-20 h-20">
                  <svg
                    className="gear-right w-20 h-20 text-slate-600 drop-shadow-xl"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97 0-.33-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.31-.61-.22l-2.49 1c-.52-.39-1.06-.73-1.69-.98l-.37-2.65A.506.506 0 0 0 14 2h-4c-.25 0-.46.18-.5.42l-.37 2.65c-.63.25-1.17.59-1.69.98l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1 0 .33.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.06.74 1.69.99l.37 2.65c.04.24.25.42.5.42h4c.25 0 .46-.18.5-.42l.37-2.65c.63-.26 1.17-.59 1.69-.99l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="md:hidden space-y-3 sm:space-y-4 pt-4 sm:pt-6">
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <div className="h-px flex-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
                <h3 className="text-lg xs:text-xl sm:text-2xl font-black text-gray-800 uppercase tracking-wide whitespace-nowrap">Get in Touch</h3>
                <div className="h-px flex-1 bg-gradient-to-l from-orange-500 to-transparent"></div>
              </div>

              <a href="tel:+919158575785" className="group flex items-center gap-3 xs:gap-4 p-4 xs:p-5 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 border-2 border-orange-200 hover:border-orange-400 rounded-xl xs:rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                <div className="flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] xs:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5 xs:mb-1">Call Us</p>
                  <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-black text-gray-900 group-hover:text-orange-600 transition-colors block">+91 9158575785</span>
                </div>
              </a>

              <a href="mailto:info@blitzindiaengineering.com" className="group flex items-center gap-3 xs:gap-4 p-4 xs:p-5 bg-gradient-to-br from-orange-50 via-white to-orange-50/30 border-2 border-orange-200 hover:border-orange-400 rounded-xl xs:rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                <div className="flex-shrink-0 w-12 h-12 xs:w-14 xs:h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl xs:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] xs:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5 xs:mb-1">Email Us</p>
                  <span className="text-xs xs:text-sm sm:text-base md:text-lg font-black text-gray-900 group-hover:text-orange-600 transition-colors break-words leading-tight block">info@blitzindiaengineering.com</span>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col md:items-end space-y-8">
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider md:text-right">Legal</h3>
              <div className="flex flex-wrap gap-4">
                <a href="/privacy-policy" className="group relative px-8 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-orange-50 hover:to-white rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-orange-500 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                  <span className="relative z-10 text-gray-700 group-hover:text-orange-600 font-bold text-sm sm:text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    Privacy Policy
                  </span>
                </a>
                <a href="/terms-of-service" className="group relative px-8 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-orange-50 hover:to-white rounded-2xl transition-all duration-300 border-2 border-gray-200 hover:border-orange-500 shadow-md hover:shadow-xl hover:-translate-y-0.5">
                  <span className="relative z-10 text-gray-700 group-hover:text-orange-600 font-bold text-sm sm:text-base flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Terms of Service
                  </span>
                </a>
              </div>
            </div>

            <div className="hidden md:flex flex-col gap-3 lg:gap-4 pt-4 lg:pt-6 w-full">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 bg-gradient-to-l from-orange-500 to-transparent"></div>
                <h3 className="text-lg lg:text-xl xl:text-2xl font-black text-gray-800 uppercase tracking-wide whitespace-nowrap">Get in Touch</h3>
                <div className="h-px flex-1 bg-gradient-to-r from-orange-500 to-transparent"></div>
              </div>

              <a href="tel:+919158575785" className="group flex items-center gap-3 lg:gap-4 p-4 lg:p-5 bg-gradient-to-bl from-orange-50 via-white to-orange-50/30 border-2 border-orange-200 hover:border-orange-400 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 justify-end">
                <div className="text-right flex-1 min-w-0">
                  <p className="text-[10px] lg:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5 lg:mb-1">Call Us</p>
                  <span className="text-base lg:text-lg xl:text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight block">+91 9158575785</span>
                </div>
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
              </a>

              <a href="mailto:info@blitzindiaengineering.com" className="group flex items-center gap-3 lg:gap-4 p-4 lg:p-5 bg-gradient-to-bl from-orange-50 via-white to-orange-50/30 border-2 border-orange-200 hover:border-orange-400 rounded-xl lg:rounded-2xl transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 justify-end">
                <div className="text-right flex-1 min-w-0">
                  <p className="text-[10px] lg:text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5 lg:mb-1">Email Us</p>
                  <span className="text-sm lg:text-base xl:text-lg 2xl:text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors uppercase tracking-tight break-words leading-tight block">info@blitzindiaengineering.com</span>
                </div>
                <div className="flex-shrink-0 w-14 h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl lg:rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-orange-500/50 group-hover:scale-110 transition-all duration-300">
                  <svg className="w-7 h-7 lg:w-8 lg:h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </div>

        <div className="relative mb-10">
          <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-6 text-gray-600 text-sm">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="flex items-center gap-2.5 font-medium">
              <span className="text-xl font-extrabold tracking-wide text-gray-800 drop-shadow-sm">©</span>
              <span className="text-gray-700 font-semibold">{new Date().getFullYear()} Blitz India Engineering.</span>
              <span className="text-gray-500">All rights reserved.</span>
            </p>
          </div>


          <div className="flex items-center gap-2 text-sm">
            <span className="text-gray-600 font-medium">Developed by</span>

            <a
              href="https://www.linkedin.com/in/j-sudharshan-reddy/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-gray-50 transition-all duration-200"
              aria-label="Visit Sudharshan's LinkedIn profile"
            >
              <span className="text-gray-800 font-semibold group-hover:text-orange-600 transition-colors">
                Sudarshan
              </span>

              <svg className="w-4 h-4 text-blue-600 group-hover:text-blue-700 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>

        </div>
      </div>

      <div className="h-2 bg-gradient-to-r from-orange-400 via-orange-600 to-orange-400 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
      </div>
    </footer>
  );
};

export default Footer;