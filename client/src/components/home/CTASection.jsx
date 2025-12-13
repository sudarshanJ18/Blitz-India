"use client";

import React, { useState, useEffect, useRef } from "react";
import { WobbleCard } from "../ui/wobble-card";
import { Link } from "react-router-dom";
import * as testimonialsService from '../../services/testimonials.service';

const CTASection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollContainerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  useEffect(() => {
    if (testimonials.length > 0 && scrollContainerRef.current) {
      const scrollContainer = scrollContainerRef.current;
      let scrollInterval;

      const startScrolling = () => {
        scrollInterval = setInterval(() => {
          if (!isPaused && scrollContainer) {
            scrollContainer.scrollLeft += 1;
            if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
              scrollContainer.scrollLeft = 0;
            }
          }
        }, 20);
      };

      startScrolling();

      return () => {
        if (scrollInterval) clearInterval(scrollInterval);
      };
    }
  }, [testimonials, isPaused]);

  const fetchTestimonials = async () => {
    try {
      const data = await testimonialsService.getAllTestimonials({ published: true });
      const duplicated = [...(data || []), ...(data || [])];
      setTestimonials(duplicated);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-6 bg-gradient-to-br from-white via-gray-50 to-orange-50/30 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-blue-500/5 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 max-w-7xl mx-auto w-full">
          <WobbleCard containerClassName="col-span-1 lg:col-span-2 h-full min-h-[400px] lg:min-h-[350px]">
            <div className="max-w-md">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-bold tracking-[-0.015em] text-gray-900">
                Ready to Accelerate Your Product Development?
              </h2>
              <p className="mt-2 text-left text-base/6 text-gray-600">
                Let's discuss how our engineering expertise can help bring your ideas to life faster and more efficiently.
              </p>
              <div className="mt-3 flex flex-col sm:flex-row gap-3">
                <Link to="/contact" className="inline-flex items-center justify-center px-5 py-2.5 border border-transparent text-base font-medium rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-orange-600/30">
                  Start Your Project
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link to="/services" className="inline-flex items-center justify-center px-5 py-2.5 border-2 border-gray-300 text-base font-medium rounded-xl text-gray-700 hover:bg-gray-800 hover:text-white hover:border-gray-800 transition-all duration-200 transform hover:scale-105 shadow-sm">
                  Explore Services
                </Link>
              </div>
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 min-h-[350px]">
            <div className="max-w-xs">
              <h2 className="text-left text-balance text-base md:text-xl lg:text-2xl font-bold tracking-[-0.015em] text-gray-900 mb-3">
                Get In Touch
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Phone</h3>
                    <p className="text-gray-600 text-sm">+91 9158575785</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Email</h3>
                    <a href="mailto:info@blitzindiaengineering.com" className="text-gray-600 text-sm hover:underline">
                      info@blitzindiaengineering.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-orange-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Location</h3>
                    <p className="text-gray-600 text-sm">Pune, India</p>
                  </div>
                </div>
              </div>
              {/* <div className="mt-5 pt-3 border-t border-gray-200">
                <p className="text-orange-600 text-sm font-medium">Available 24/7 for your queries</p>
              </div> */}
            </div>
          </WobbleCard>

          <WobbleCard containerClassName="col-span-1 lg:col-span-3 min-h-[400px] lg:min-h-[350px]">
            <div className="max-w-full w-full">
              <div className="max-w-xl sm:text-center md:mx-auto mb-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">
                  Success through our customer's eyes
                </h3>
              </div>

              {loading ? (
                <div className="mt-6 flex justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
                </div>
              ) : testimonials.length === 0 ? (
                <div className="mt-6 text-center text-gray-600">
                  <p>No testimonials available at the moment.</p>
                </div>
              ) : (
                <div className="mt-6 relative">
                  <div ref={scrollContainerRef} className="overflow-x-hidden scroll-smooth" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
                    <div className="flex gap-5 pb-4">
                      {testimonials.map((item, idx) => (
                        <div key={idx} className="flex-shrink-0 w-80 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                          <div className="p-3">
                            <svg className="w-9 h-9 text-orange-500" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.47895 14.5833C9.15374 14.5833 8.84166 14.6329 8.53103 14.6781C8.63166 14.3398 8.7352 13.9956 8.90145 13.6865C9.0677 13.2373 9.32728 12.8479 9.58541 12.4556C9.80124 12.0312 10.1819 11.7439 10.4619 11.3808C10.755 11.0279 11.1546 10.7931 11.471 10.5C11.7817 10.1937 12.1885 10.0406 12.5123 9.82478C12.8506 9.63082 13.1452 9.41645 13.4602 9.31437L14.2462 8.99062L14.9375 8.70332L14.2302 5.87708L13.3596 6.08707C13.081 6.15707 12.7412 6.23874 12.3548 6.33645C11.9596 6.40937 11.5381 6.60916 11.0685 6.79145C10.6048 6.99853 10.0681 7.13853 9.56937 7.47103C9.0677 7.78895 8.48874 8.05437 7.97833 8.4802C7.48395 8.91916 6.88749 9.29978 6.44708 9.85833C5.96583 10.3804 5.49041 10.9287 5.12145 11.5529C4.69416 12.1479 4.40395 12.8012 4.0977 13.4473C3.82062 14.0933 3.59749 14.754 3.4152 15.3956C3.06958 16.6819 2.91499 17.904 2.8552 18.9496C2.80562 19.9967 2.83478 20.8673 2.89603 21.4973C2.91791 21.7948 2.95874 22.0835 2.98791 22.2833L3.02437 22.5283L3.06228 22.5196C3.32167 23.7312 3.91877 24.8446 4.78452 25.7311C5.65028 26.6175 6.7493 27.2408 7.95447 27.5287C9.15963 27.8166 10.4217 27.7575 11.5946 27.3581C12.7676 26.9587 13.8035 26.2354 14.5825 25.2719C15.3616 24.3083 15.8519 23.1439 15.9969 21.9133C16.1418 20.6828 15.9353 19.4363 15.4014 18.3181C14.8675 17.2 14.028 16.2558 12.9799 15.5949C11.9318 14.934 10.718 14.5832 9.47895 14.5833ZM25.5206 14.5833C25.1954 14.5833 24.8833 14.6329 24.5727 14.6781C24.6733 14.3398 24.7769 13.9956 24.9431 13.6865C25.1094 13.2373 25.369 12.8479 25.6271 12.4556C25.8429 12.0312 26.2235 11.7439 26.5035 11.3808C26.7967 11.0279 27.1962 10.7931 27.5127 10.5C27.8233 10.1937 28.2302 10.0406 28.554 9.82478C28.8923 9.63082 29.1869 9.41645 29.5019 9.31437L30.2879 8.99062L30.9792 8.70332L30.2719 5.87708L29.4012 6.08707C29.1227 6.15707 28.7829 6.23874 28.3965 6.33645C28.0012 6.40937 27.5798 6.60916 27.1102 6.79145C26.6479 6.99999 26.1098 7.13853 25.611 7.47249C25.1094 7.79041 24.5304 8.05582 24.02 8.48166C23.5256 8.92062 22.9292 9.30124 22.4887 9.85833C22.0075 10.3804 21.5321 10.9287 21.1631 11.5529C20.7358 12.1479 20.4456 12.8012 20.1394 13.4473C19.8623 14.0933 19.6392 14.754 19.4569 15.3956C19.1112 16.6819 18.9567 17.904 18.8969 18.9496C18.8473 19.9967 18.8765 20.8673 18.9377 21.4973C18.9596 21.7948 19.0004 22.0835 19.0296 22.2833L19.066 22.5283L19.104 22.5196C19.3633 23.7312 19.9604 24.8446 20.8262 25.7311C21.6919 26.6175 22.791 27.2408 23.9961 27.5287C25.2013 27.8166 26.4634 27.7575 27.6363 27.3581C28.8093 26.9587 29.8452 26.2354 30.6242 25.2719C31.4033 24.3083 31.8936 23.1439 32.0385 21.9133C32.1834 20.6828 31.977 19.4363 31.4431 18.3181C30.9092 17.2 30.0697 16.2558 29.0216 15.5949C27.9735 14.934 26.7597 14.5832 25.5206 14.5833Z" fill="currentColor" />
                            </svg>
                          </div>
                          <figure>
                            <blockquote>
                              <p className="text-gray-800 text-base font-medium px-4 py-1 leading-relaxed">
                                "{item.testimonial}"
                              </p>
                            </blockquote>
                            <div className="flex items-center gap-x-4 p-4 mt-5 bg-orange-50 rounded-b-xl border-t border-orange-100">
                              {item.image ? (
                                <img src={item.image} alt={item.name} className="w-12 h-12 rounded-full border-2 border-orange-400 object-cover" />
                              ) : (
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white font-bold text-lg border-2 border-orange-400">
                                  {item.name.charAt(0)}
                                </div>
                              )}
                              <div>
                                <span className="block text-gray-800 font-semibold">{item.name}</span>
                                <span className="block text-orange-600 text-sm mt-0.5">{item.position} {item.company && `at ${item.company}`}</span>
                              </div>
                            </div>
                          </figure>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-orange-50/80 to-transparent pointer-events-none"></div>
                  <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-orange-50/80 to-transparent pointer-events-none"></div>
                  {isPaused && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Hover to pause scrolling
                    </div>
                  )}
                </div>
              )}
            </div>
          </WobbleCard>
        </div>
      </div>
    </section>
  );
};

export default CTASection;