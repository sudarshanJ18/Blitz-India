import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, videos, serviceimgs } from '../../assets/assets.js';
import { cn } from '@/lib/utils';

const ServicesGrid = () => {
  // Map category IDs to their corresponding videos and images
  const categoryMedia = {
    1: { 
      video: videos.design, 
      image: serviceimgs.servicedesign,
      title: "Design & Modelling"
    },
    2: { 
      video: videos.doc, 
      image: serviceimgs.servicedoc,
      title: "Documentation"
    },
    3: { 
      video: videos.analysisvd, 
      image: serviceimgs.serviceanal,
      title: "Analysis & Validation"
    },
    4: { 
      video: videos.manufact, 
      image: serviceimgs.serviceman,
      title: "Manufacturing Support"
    }
  };

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-left">
            Services Portfolio
          </h2>
          {/* <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto px-2">
            From concept to production, we offer comprehensive engineering services tailored to your specific needs.
          </p> */}
        </div>

        {/* Service Categories Grid - 2x2 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {serviceCategories.map((category) => {
            const media = categoryMedia[category.id];
            
            return (
              <ServiceCard
                key={category.id}
                category={category}
                media={media}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ category, media }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        // Handle autoplay restrictions
        console.log('Video autoplay prevented:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  // Touch handlers for mobile devices
  const handleTouchStart = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.play().catch(err => {
        console.log('Video autoplay prevented:', err);
      });
    }
  };

  const handleTouchEnd = () => {
    // Delay to allow navigation on mobile
    setTimeout(() => {
      setIsHovered(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
    }, 300);
  };

  return (
    <Link
      to={`/services/${category.id}`}
      className={cn(
        "group w-full cursor-pointer overflow-hidden relative rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl active:scale-[0.98]",
        "bg-white border-2 border-gray-200 hover:border-orange-500 active:border-orange-500",
        "transition-all duration-500 ease-in-out",
        "flex flex-col h-full min-h-[400px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px]"
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Media Container - Full Height */}
      <div className="relative h-full min-h-[400px] sm:min-h-[500px] md:min-h-[550px] lg:min-h-[600px] overflow-hidden bg-gray-100">
        {/* Background Image - shown by default */}
        <div 
          className={cn(
            "absolute inset-0 bg-cover bg-center transition-opacity duration-500",
            isHovered ? "opacity-0 scale-110" : "opacity-100 scale-100"
          )}
          style={{
            backgroundImage: `url(${media.image})`
          }}
        />

        {/* Video - shown on hover */}
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 w-full h-full object-cover transition-opacity duration-500",
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-110"
          )}
          src={media.video}
          muted
          loop
          playsInline
        />

        {/* Glass Effect Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 sm:p-5 md:p-6 lg:p-8">
          {/* Glass Background */}
          <div className="relative backdrop-blur-md bg-white/20 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 border border-white/30 shadow-2xl">
            {/* Glass effect inner glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-xl sm:rounded-2xl"></div>
            
            {/* Content */}
            <div className="relative z-10">
              

             

              {/* Main Title */}
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2 sm:mb-3 group-hover:text-orange-400 active:text-orange-400 transition-colors duration-300 drop-shadow-lg leading-tight">
                {category.title}
              </h3>

              {/* Description */}
              <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 line-clamp-2 drop-shadow-md leading-relaxed">
                {category.description}
              </p>
              
              {/* CTA Button with Glass Effect */}
              <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/20">
                <div className="flex items-center justify-between group-hover:justify-start group-active:justify-start transition-all duration-300">
                  <span className="text-orange-400 font-bold text-sm sm:text-base group-hover:mr-2 group-active:mr-2 transition-all duration-300 drop-shadow-lg">
                    Explore Services
                  </span>
                  <svg 
                    className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 transform group-hover:translate-x-2 group-active:translate-x-2 transition-transform duration-300 drop-shadow-lg" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth={2.5}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServicesGrid;