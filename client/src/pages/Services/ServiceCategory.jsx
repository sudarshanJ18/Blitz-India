import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { serviceCategories, categoryImages } from '../../assets/assets.js';

const ServiceCategory = () => {
  const { categoryId } = useParams();
  const category = serviceCategories.find(cat => cat.id === Number(categoryId));
  
  // Hero images for each category
  const heroImages = {
    1: "https://landingfoliocom.imgix.net/store/collection/dusk/images/hero/1/3d-illustration.png",
    2: categoryImages.docpng,
    3: categoryImages.analpng,
    4: categoryImages.manupng
  };

  // Category-specific descriptions and features
  const categoryFeatures = {
    1: {
      tagline: "Transform Ideas into Digital Reality",
      featureText: "Latest 3D modeling technologies and innovative design approaches"
    },
    2: {
      tagline: "Comprehensive Technical Documentation",
      featureText: "Detailed documentation created with precision and clarity"
    },
    3: {
      tagline: "Rigorous Testing & Quality Assurance",
      featureText: "Advanced analysis tools ensuring optimal performance and reliability"
    },
    4: {
      tagline: "End-to-End Production Support",
      featureText: "Seamless manufacturing processes from prototype to production"
    }
  };

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-black mb-4">Category Not Found</h1>
          <Link to="/services" className="text-orange-600 hover:text-orange-800">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  const categoryFeature = categoryFeatures[category.id] || categoryFeatures[1];

  // Function to truncate description to 2-3 lines
  const truncateDescription = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-white sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 xl:pt-36 xl:pb-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="relative">
            <div className="lg:w-2/3">
              <h1 className="mt-6 text-4xl font-bold text-gray-800 sm:mt-10 sm:text-5xl lg:text-6xl xl:text-8xl">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                  {category.title}
                </span>{' '}
                Solutions
              </h1>
              <p className="max-w-lg mt-4 text-xl font-normal text-gray-500 sm:mt-8">
                {category.description}
              </p>
              <div className="relative inline-flex items-center justify-center mt-8 sm:mt-12 group">
                <div className="absolute transition-all duration-200 rounded-full -inset-px bg-gradient-to-r from-orange-500 to-orange-600 group-hover:shadow-lg group-hover:shadow-orange-500/50"></div>
                <a 
                  href="#services" 
                  className="relative inline-flex items-center justify-center px-8 py-3 text-base font-normal text-white bg-black border border-transparent rounded-full"
                  role="button"
                >
                  Explore {category.title} Services
                </a>
              </div>

              <div>
                <div className="inline-flex items-center pt-6 mt-8 border-t border-gray-300 sm:pt-10 sm:mt-14">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                    <path 
                      d="M13 7.00003H21M21 7.00003V15M21 7.00003L13 15L9 11L3 17" 
                      stroke="url(#orangeGradient)" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                    <defs>
                      <linearGradient id="orangeGradient" x1="3" y1="7.00003" x2="22.2956" y2="12.0274" gradientUnits="userSpaceOnUse">
                        <stop offset="0%" style={{stopColor: '#f97316'}} />
                        <stop offset="100%" style={{stopColor: '#ea580c'}} />
                      </linearGradient>
                    </defs>
                  </svg>
                  <span className="ml-2 text-base font-normal text-black">
                    {categoryFeature.featureText}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-8 md:absolute md:mt-0 md:top-32 lg:top-0 md:right-0">
              <img 
                className="w-full max-w-xs mx-auto lg:max-w-lg xl:max-w-xl transform hover:scale-105 transition-transform duration-300" 
                src={heroImages[category.id]} 
                alt={`${category.title} Services - ${categoryFeature.tagline}`} 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 sm:text-5xl">
              Our {category.title} Services
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              {categoryFeature.tagline}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {category.services.map((service) => (
              <div 
                key={service.id} 
                className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl border border-gray-200 hover:border-orange-200 flex flex-col h-full"
              >
                {/* Background Gradient Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 group-hover:from-orange-50 group-hover:to-white transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
                
                {/* Image Container */}
                <div className="relative h-48">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-transparent to-transparent"></div>
                  <div className="absolute top-4 right-4 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    {categoryId}.{service.subId}
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  </div>
                  <Link 
                    to={`/services/${categoryId}/${service.subId}`} 
                    className="absolute inset-0 bg-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                  >
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </div>
                
                {/* Content Container */}
                <div className="relative p-6 flex flex-col flex-grow z-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-700 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 flex-grow line-clamp-3 leading-relaxed">
                    {truncateDescription(service.description)}
                  </p>
                  
                  
                   
                  {/* Enhanced Learn More Button */}
                  <Link
  to={`/services/${categoryId}/${service.subId}`}
  className="shadow-[0_0_0_2px_#000000_inset] px-4 py-2 bg-transparent border border-black text-black rounded-lg font-medium transform hover:-translate-y-0.5 transition duration-300 text-center group/btn mt-auto self-start"
>
  <span className="flex items-center justify-center text-sm">
    Learn More
    <svg className="w-3.5 h-3.5 ml-1.5 transform group-hover/btn:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  </span>
</Link>
                </div>

                {/* Corner Accent */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-6 -translate-y-6 rotate-45"></div>
              </div>
            ))}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16">
            <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
              <p className="text-gray-600 text-lg">
                Need help choosing the right service?
              </p>
              <Link
  to="/contact"
  className="shadow-[0_0_0_3px_#f97316_inset] px-8 py-3 bg-transparent border border-orange-500 text-orange-600 rounded-lg font-bold transform hover:-translate-y-1 transition duration-400 hover:bg-orange-500 hover:text-white hover:shadow-none"
>
  Get Free Consultation
</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceCategory;