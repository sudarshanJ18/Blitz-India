import React from 'react';
import PortfolioHero from '../../components/portfolio/PortfolioHero.jsx';
import PortfolioGallery from '../../components/portfolio/PortfolioGallery.jsx';
import PortfolioStats from '../../components/portfolio/PortfolioStats.jsx';
import PortfolioCTA from '../../components/portfolio/PortfolioCTA.jsx';

const Portfolio = () => {
  return (
    <div className="min-h-screen">
      <PortfolioHero />
      <PortfolioGallery />
      <PortfolioStats />
      <PortfolioCTA />
    </div>
  );
};

export default Portfolio;