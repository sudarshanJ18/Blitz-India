import React from 'react';
import Hero from '../../components/home/Hero.jsx';
import Highlights from '../../components/home/Highlights.jsx';
import ServicesSection from '../../components/home/ServicesSection.jsx';
import TeamSection from '../../components/home/TeamSection.jsx';
import AboutSection from '../../components/home/AboutSection.jsx';
import ValuesSection from '../../components/home/ValuesSection.jsx';
import CTASection from '../../components/home/CTASection.jsx';

const Home = () => {
  return (
    <div className="relative overflow-x-hidden">
      <Hero />
      <Highlights />
      <ServicesSection />
      <TeamSection />
      <AboutSection />
      <ValuesSection />
      <CTASection />
    </div>
  );
};

export default Home;