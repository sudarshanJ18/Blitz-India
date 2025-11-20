"use client";

import React from "react";

const Highlights = () => {
  const highlights = [
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Fast Turnaround",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quality Assurance",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3a9 9 0 100 18 9 9 0 000-18z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M2 12h20M12 2c2.5 2.5 4 5.5 4 10s-1.5 7.5-4 10c-2.5-2.5-4-5.5-4-10s1.5-7.5 4-10z"
          />
        </svg>
      ),
      title: "Global Delivery",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      title: "Technical Innovation",
    },
    {
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      title: "Expert Team",
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-white via-gray-50 to-gray-100 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_10%,transparent_110%)] opacity-40"></div>

      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-orange-500/20 rounded-full blur-4xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gray-500/20 rounded-full blur-4xl animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left mb-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-500 mb-6">
            Why <span className="text-orange-600">Blitz India Engineering</span> ?
          </h2>
        </div>

        {/* Updated height & overflow fix */}
        <div className="h-[520px] w-full relative overflow-x-hidden pb-8">
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-white via-white to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white via-white to-transparent z-10 pointer-events-none"></div>

          {/* First Row */}
          <div className="flex space-x-8 absolute top-0 left-0 animate-infinite-scroll hover:pause-animation">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="w-96 flex-shrink-0 bg-white/90 backdrop-blur-lg border border-gray-300/50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:border-orange-500/70 group shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/15 text-orange-600 rounded-2xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                  {highlight.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">
                  {highlight.title}
                </h3>
              </div>
            ))}

            {highlights.map((highlight, index) => (
              <div
                key={index + highlights.length}
                className="w-96 flex-shrink-0 bg-white/90 backdrop-blur-lg border border-gray-300/50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:border-orange-500/70 group shadow-lg"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500/15 text-orange-600 rounded-2xl mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                  {highlight.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-orange-600 transition-colors duration-500">
                  {highlight.title}
                </h3>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex space-x-8 absolute top-40 left-0 animate-infinite-scroll-reverse mt-12 hover:pause-animation">
            {highlights
              .slice()
              .reverse()
              .map((highlight, index) => (
                <div
                  key={index}
                  className="w-96 flex-shrink-0 bg-white/80 backdrop-blur-lg border border-gray-300/50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:border-gray-500/70 group shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-500/15 text-gray-600 rounded-2xl mb-6 group-hover:bg-gray-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                    {highlight.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors duration-500">
                    {highlight.title}
                  </h3>
                </div>
              ))}

            {highlights
              .slice()
              .reverse()
              .map((highlight, index) => (
                <div
                  key={index + highlights.length}
                  className="w-96 flex-shrink-0 bg-white/80 backdrop-blur-lg border border-gray-300/50 rounded-3xl p-8 hover:bg-white hover:shadow-2xl transition-all duration-500 hover:scale-110 hover:border-gray-500/70 group shadow-lg"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-500/15 text-gray-600 rounded-2xl mb-6 group-hover:bg-gray-600 group-hover:text-white transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg">
                    {highlight.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-600 transition-colors duration-500">
                    {highlight.title}
                  </h3>
                </div>
              ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes infinite-scroll-reverse {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-infinite-scroll {
          animation: infinite-scroll 35s linear infinite;
        }

        .animate-infinite-scroll-reverse {
          animation: infinite-scroll-reverse 30s linear infinite;
        }

        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};

export default Highlights;
