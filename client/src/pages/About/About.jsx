import React from 'react';
import AboutHero from '../../components/about/AboutHero.jsx';
import CompanyStory from '../../components/about/CompanyStory.jsx';
import LeadershipTeam from '../../components/about/LeadershipTeam.jsx';
import CompanyValues from '../../components/about/CompanyValues.jsx';
import CompanyStats from '../../components/about/CompanyStats.jsx';
import CompanyCapabilities from '../../components/about/CompanyCapabilities.jsx';
import AboutCTA from '../../components/about/AboutCTA.jsx';

const About = () => {
  return (
    <div className="min-h-screen">
      <AboutHero />
      <CompanyStory />
      <CompanyValues />
      <CompanyStats />
      <CompanyCapabilities />
      <LeadershipTeam />
      <AboutCTA />
    </div>
  );
};

export default About;