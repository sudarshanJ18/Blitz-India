"use client";

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from "framer-motion";
import { serviceCategories } from '../../assets/assets.js';
import { HeroHighlight, Highlight } from '../../components/ui/hero-highlight.jsx';
import ServiceOverview from '../../components/services/ServiceOverview.jsx';
import ServiceFeatures from '../../components/services/ServiceFeatures.jsx';
import ServiceProcess from '../../components/services/ServiceProcess.jsx';
import ServicesCTA from '../../components/services/ServicesCTA.jsx';

const ServiceDetail = () => {
  const { categoryId, serviceId } = useParams();
  const category = serviceCategories.find(cat => cat.id === Number(categoryId));
  const service = category?.services.find(s => s.subId === Number(serviceId));
  
  if (!service || !category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Service Not Found</h1>
          <Link to="/services" className="text-orange-500 hover:text-orange-600">
            ← Back to Services
          </Link>
        </div>
      </div>
    );
  }

  // Add category info to service for breadcrumb navigation
  const serviceWithCategory = {
    ...service,
    category: category.title,
    categoryId: category.id,
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner with Image Background */}
      <section className="relative pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20 min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          {/* Left Side Fade Overlay - White gradient from left to transparent on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
          {/* Additional bottom gradient for better text visibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Link
              to={`/services/${categoryId}`}
              className="inline-flex items-center text-gray-700 hover:text-orange-600 transition-colors duration-200 text-sm sm:text-base font-medium"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to {category.title}
            </Link>
          </motion.div>

        

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 max-w-3xl leading-tight sm:leading-relaxed lg:leading-snug mb-6 drop-shadow-sm"
          >
            {service.title}
          </motion.h1>

         

          {/* Timeline if available */}
          {service.timeline && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center text-gray-700"
            >
              <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm sm:text-base font-medium">{service.timeline}</span>
            </motion.div>
          )}
        </div>
      </section>

      {/* Other Sections */}
      <div className="bg-white">
        <ServiceOverview service={serviceWithCategory} />
        <ServiceFeatures service={serviceWithCategory} />
       
        <ServicesCTA />
      </div>
    </div>
  );
};

export default ServiceDetail;