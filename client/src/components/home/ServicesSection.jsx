"use client";

import React from 'react';
import { Link } from 'react-router-dom';
import { serviceCategories, serviceImg } from '../../assets/assets.js';
import { Carousel, Card } from "../ui/apple-cards-carousel";
import { HoverBorderGradient } from "../ui/hover-border-gradient";

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
        
        <div className="text-center mb-4 md:mb-6 lg:mb-8 px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-left">
            Our Services
          </h2>
        </div>

        
        <div className="w-full">
          
          <div className="hidden md:block">
            <Carousel items={cards} />
          </div>

          
          <div className="md:hidden flex flex-col gap-6 px-2">
            {cardsData.map((card, index) => (
              <Card
                key={card.src}
                card={card}
                index={index}
                className="w-full h-80"
              />
            ))}
          </div>
        </div>

        
        <div className="mt-4 md:mt-6 lg:mt-8 px-4 flex justify-center">
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
      
      <div className="bg-white border border-gray-200 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            {category.title} - Professional Engineering Services
          </h3>
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed">
            {category.description} . Highest quality standards and technical expertise to ensure your project's success.
          </p>

          {/* Services showcase image */}
          <div className="w-full overflow-hidden rounded-lg sm:rounded-xl border border-gray-200">
            <img
              src={image}
              alt={category.title}
              className="w-full h-auto max-h-[200px] sm:max-h-[250px] md:max-h-[300px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Services list */}
      <div className="bg-white border border-gray-200 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center border-b border-gray-200 pb-3 sm:pb-4">
            Available Services
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {category.services.slice(0, 6).map((service, index) => (
              <Link
                key={service.id}
                to={`/services/${category.id}/${service.subId}`}
                onClick={() => window.scrollTo({ top: 0, left: 0, behavior: 'auto' })}
                className="flex items-start p-3 sm:p-4 bg-white border border-gray-200 rounded-lg sm:rounded-xl hover:border-orange-300 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center mr-3 sm:mr-4 shadow-sm group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-xs sm:text-sm font-bold">
                    {category.id}.{service.subId}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-baseline mb-1">
                    <h4 className="font-semibold text-gray-900 text-base sm:text-lg break-words leading-tight group-hover:text-orange-600 transition-colors duration-200">
                      {service.title}
                    </h4>
                  </div>
                  {service.description && (
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed line-clamp-2">
                      {service.description}
                    </p>
                  )}
                </div>
              </Link>
            ))}
          </div>

          {category.services.length > 6 && (
            <div className="text-center mt-4 sm:mt-6 pt-4 border-t border-gray-200">
              <span className="text-orange-600 text-sm sm:text-base font-semibold">
                +{category.services.length - 6} more services available
              </span>
            </div>
          )}
        </div>
      </div>

      
      <div className="bg-white border border-gray-200 p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-sm">
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
            Ready to Get Started?
          </h3>
          <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 leading-relaxed px-2 sm:px-0">
            Contact us today to discuss your {category.title} requirements and get a customized solution tailored to your specific needs.
          </p>
          <Link to={`/services/${category.id}`}>
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="bg-gradient-to-r from-orange-500 to-orange-600 text-white flex items-center space-x-2 px-6 py-3 text-base font-medium hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg"
              duration={0.8}
            >
              <span>Explore {category.title}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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