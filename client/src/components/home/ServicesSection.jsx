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
    <div className="w-full bg-white py-4 md:py-6 lg:py-8">
      <div className="w-full max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
        {/* Header Section */}
        <div className="text-center mb-4 md:mb-6 lg:mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
            Our Services
          </h2>
        </div>
        
        {/* Carousel Section */}
        <div className="w-full">
          <Carousel items={cards} />
        </div>
        
        {/* CTA Button */}
        <div className="text-center mt-4 md:mt-6 lg:mt-8 px-4">
          <Link to="/services">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center space-x-2 px-6 py-3 text-base font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
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
    <div className="space-y-2 sm:space-y-3 md:space-y-4">
      {/* Main description */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            {category.title} - Professional Engineering Services
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed">
            {category.description} . Highest quality standards and technical expertise to ensure your project's success.
          </p>
          
          {/* Services showcase image */}
          <div className="w-full overflow-hidden rounded-md sm:rounded-lg border border-gray-200">
            <img
              src={image}
              alt={category.title}
              className="w-full h-auto max-h-[120px] sm:max-h-[200px] md:max-h-[250px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 text-center border-b border-gray-200 pb-2 sm:pb-3">
            Available Services 
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
            {category.services.slice(0, 6).map((service, index) => (
              <div 
                key={service.id} 
                className="flex items-start p-2 sm:p-3 bg-white border border-gray-200 rounded-md sm:rounded-lg hover:border-orange-300 hover:shadow-md transition-all duration-300"
              >
                <div className="flex-shrink-0 w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-2 sm:mr-3 shadow-sm">
                  <span className="text-white text-[9px] sm:text-xs font-bold">
                    {category.id}.{service.subId}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base break-words leading-tight">
                      {service.title}
                    </h4>
                  </div>
                  {service.description && (
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {category.services.length > 6 && (
            <div className="text-center mt-3 sm:mt-4 pt-3 border-t border-gray-200">
              <span className="text-orange-600 text-sm sm:text-base font-semibold">
                +{category.services.length - 6} more services available
              </span>
            </div>
          )}
        </div>
      </div>

      {/* CTA section */}
      <div className="bg-white border border-gray-200 p-3 sm:p-4 md:p-5 rounded-lg sm:rounded-xl shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 leading-tight">
            Ready to Get Started?
          </h3>
          <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4 leading-relaxed px-2 sm:px-0">
            Contact us today to discuss your {category.title} requirements and get a customized solution tailored to your specific needs.
          </p>
          <Link to={`/services/${category.id}`}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center space-x-2 px-4 py-2 text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
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