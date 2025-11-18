"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, serviceImg } from '../../assets/assets.js';
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export function ServicesSection() {
  const cardsData = serviceCategories.map((category, index) => {
    const images = [
      serviceImg.designmodelling,
      serviceImg.documentation,
      serviceImg.analysis,
      serviceImg.manufacturing
    ];
    
    return {
      
      title: category.title,
      src: images[index] || category.services[0]?.image,
      content: <ServiceContent category={category} image={images[index]} />,
      description: category.description,
      serviceCount: category.services.length,
      services: category.services
    };
  });

  const cards = cardsData.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full min-h-screen bg-white py-8 md:py-12 lg:py-20">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        {/* Header Section with White Background */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-left">
            Our Services
          </h2>
        </div>
        
        {/* Carousel Section */}
        <div className="w-full">
          <Carousel items={cards} />
        </div>
        
        {/* CTA Button with Orange/Steel Gray Colors */}
        <div className="text-center mt-8 md:mt-12 lg:mt-16 px-4">
          <Link to="/services">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center space-x-2 px-8 py-4 text-base font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              duration={0.8}
            >
              <span>Detailed Services</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </div>
  );
}

const ServiceContent = ({ category, image }) => {
  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      {/* Main description with white background and gray border */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-6 leading-tight">
            {category.title} - Professional Engineering Services
          </h3>
          <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-3 sm:mb-4 md:mb-8 leading-relaxed">
            {category.description} . Highest quality standards and technical expertise to ensure your project's success.
          </p>
          
          {/* Services showcase image - optimized for mobile */}
          <div className="w-full overflow-hidden rounded-md sm:rounded-lg md:rounded-xl border border-gray-200">
            <img
              src={image}
              alt={category.title}
              className="w-full h-auto max-h-[200px] sm:max-h-[300px] md:max-h-[400px] lg:max-h-none object-cover"
            />
          </div>
        </div>
      </div>

      {/* Services list with white background and gray border */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-base sm:text-lg md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 md:mb-8 text-center border-b border-gray-200 pb-2 sm:pb-3 md:pb-4">
            Available Services 
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {category.services.slice(0, 6).map((service, index) => (
              <div 
                key={service.id} 
                className="flex items-start p-3 sm:p-4 md:p-6 bg-white border border-gray-200 rounded-md sm:rounded-lg md:rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 md:mr-4 shadow-sm">
                  <span className="text-white text-[10px] sm:text-xs md:text-sm font-bold">
                    {category.id}.{service.subId}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline mb-1 sm:mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg break-words leading-tight">
                      {service.title}
                    </h4>
                  </div>
                  {service.description && (
                    <p className="text-base sm:text-lg font-medium text-gray-600 leading-relaxed line-clamp-2 sm:line-clamp-none">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {category.services.length > 6 && (
            <div className="text-center mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 border-t border-gray-200">
              <span className="text-orange-600 text-sm sm:text-base md:text-lg font-semibold">
                +{category.services.length - 6} more services available
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA section with white background and gray border */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-8 lg:p-10 rounded-lg sm:rounded-xl md:rounded-2xl shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg sm:text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 sm:mb-3 md:mb-4 leading-tight">
            Ready to Get Started?
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8 leading-relaxed px-2 sm:px-0">
            Contact us today to discuss your {category.title} requirements and get a customized solution tailored to your specific needs.
          </p>
          <Link to={`/services/${category.id}`}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center space-x-2 px-6 py-3 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              duration={0.8}
            >
              <span>Explore {category.title}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </HoverBorderGradient>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;