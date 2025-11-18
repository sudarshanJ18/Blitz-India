import React from 'react';
import ServicesHero from '../../components/services/ServicesHero.jsx';
import ServicesGrid from '../../components/services/ServicesGrid.jsx';
import ServicesProcess from '../../components/services/ServicesProcess.jsx';
import ServicesCTA from '../../components/services/ServicesCTA.jsx';

const Services = () => {
  return (
    <div className="min-h-screen">
      <ServicesHero />
      <ServicesGrid />
      <ServicesProcess />
      <ServicesCTA />
    </div>
  );
};

export default Services;