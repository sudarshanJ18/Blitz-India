import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

// SVG Icons Components
const ProjectsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3v18h18" />
    <path d="M10 3v18" />
    <path d="M3 10h18" />
    <path d="M3 17h18" />
  </svg>
);

const IndustriesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const SatisfactionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
    <line x1="9" y1="9" x2="9.01" y2="9" />
    <line x1="15" y1="9" x2="15.01" y2="9" />
  </svg>
);

const ClientsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const SavingsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" />
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const DeliveryIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const PortfolioStats = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(true);

  const stats = [
    {
      id: 1,
      number: 200,
      suffix: '+',
      label: 'Projects Completed',
      description: 'Successfully delivered engineering projects across multiple industries',
      gradient: 'from-orange-500 to-orange-600',
      icon: <ProjectsIcon />
    },
    {
      id: 2,
      number: 15,
      suffix: '+',
      label: 'Industries Served',
      description: 'From automotive to aerospace, medical to energy sectors',
      gradient: 'from-blue-500 to-blue-600',
      icon: <IndustriesIcon />
    },
    {
      id: 3,
      number: 98,
      suffix: '%',
      label: 'Client Satisfaction',
      description: 'Consistently exceeding client expectations with quality deliverables',
      gradient: 'from-emerald-500 to-emerald-600',
      icon: <SatisfactionIcon />
    },
    {
      id: 4,
      number: 50,
      suffix: '+',
      label: 'Global Clients',
      description: 'Serving clients across USA, Europe, Asia, and other regions',
      gradient: 'from-purple-500 to-purple-600',
      icon: <ClientsIcon />
    },
    {
      id: 5,
      number: 25,
      suffix: '%',
      label: 'Average Cost Savings',
      description: 'Helping clients reduce development costs through efficient processes',
      gradient: 'from-red-500 to-red-600',
      icon: <SavingsIcon />
    },
    {
      id: 6,
      number: 30,
      suffix: '%',
      label: 'Faster Delivery',
      description: 'Accelerating product development with optimized workflows',
      gradient: 'from-indigo-500 to-indigo-600',
      icon: <DeliveryIcon />
    }
  ];

  // Auto-rotation effect
  useEffect(() => {
    if (isAutoRotating) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % stats.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoRotating, stats.length]);

  // Animate numbers on mount
  useEffect(() => {
    stats.forEach((stat, index) => {
      setTimeout(() => {
        let current = 0;
        const increment = stat.number / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.number) {
            setAnimatedNumbers(prev => ({ ...prev, [stat.id]: stat.number }));
            clearInterval(timer);
          } else {
            setAnimatedNumbers(prev => ({ ...prev, [stat.id]: Math.floor(current) }));
          }
        }, 30);
      }, 300 * index);
    });
  }, []);

  const handleCardClick = (index) => {
    setCurrentIndex(index);
    setIsAutoRotating(false);
    setTimeout(() => setIsAutoRotating(true), 10000);
  };

  const getCardPosition = (index) => {
    const total = stats.length;
    const diff = (index - currentIndex + total) % total;
    
    if (diff === 0) {
      return { transform: 'translateX(0) translateZ(0) rotateY(0deg) scale(1.15)', zIndex: 50, opacity: 1 };
    } else if (diff === 1 || diff === -total + 1) {
      return { transform: 'translateX(70%) translateZ(-200px) rotateY(-25deg) scale(0.85)', zIndex: 30, opacity: 0.7 };
    } else if (diff === total - 1 || diff === -1) {
      return { transform: 'translateX(-70%) translateZ(-200px) rotateY(25deg) scale(0.85)', zIndex: 30, opacity: 0.7 };
    } else if (diff === 2 || diff === -total + 2) {
      return { transform: 'translateX(130%) translateZ(-400px) rotateY(-35deg) scale(0.6)', zIndex: 10, opacity: 0.4 };
    } else if (diff === total - 2 || diff === -2) {
      return { transform: 'translateX(-130%) translateZ(-400px) rotateY(35deg) scale(0.6)', zIndex: 10, opacity: 0.4 };
    } else {
      return { transform: 'translateX(0) translateZ(-600px) scale(0.3)', zIndex: 0, opacity: 0 };
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Portfolio <span className="text-orange-600">Impact</span>
          </h2>
          {/* <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Numbers that demonstrate our commitment to engineering excellence and client success
          </p> */}
        </div>

        {/* 3D Carousel */}
        <CarouselContainer>
          <div className="carousel-wrapper">
            {stats.map((stat, index) => (
              <CarouselCard
                key={stat.id}
                style={getCardPosition(index)}
                onClick={() => handleCardClick(index)}
                isCenter={index === currentIndex}
              >
                <div className="card-inner">
                  {/* Top Section - SVG Icon */}
                  <div className={`icon-section bg-gradient-to-br ${stat.gradient}`}>
                    <div className="icon-wrapper">
                      {stat.icon}
                    </div>
                    <div className="icon-glow"></div>
                  </div>

                  {/* Bottom Section - Glass Morphism */}
                  <div className="content-section">
                    <div className="glass-bg"></div>
                    <div className="content">
                      <div className="stat-number">
                        {animatedNumbers[stat.id] || 0}{stat.suffix}
                      </div>
                      <h3 className="stat-label">{stat.label}</h3>
                      <p className="stat-description">{stat.description}</p>
                    </div>
                  </div>
                </div>
              </CarouselCard>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="nav-controls">
            <button 
              className="nav-btn"
              onClick={() => {
                setCurrentIndex((prev) => (prev - 1 + stats.length) % stats.length);
                setIsAutoRotating(false);
                setTimeout(() => setIsAutoRotating(true), 10000);
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              className="nav-btn"
              onClick={() => {
                setCurrentIndex((prev) => (prev + 1) % stats.length);
                setIsAutoRotating(false);
                setTimeout(() => setIsAutoRotating(true), 10000);
              }}
            >
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Indicator Dots */}
          <div className="indicator-dots">
            {stats.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => handleCardClick(index)}
              />
            ))}
          </div>
        </CarouselContainer>
      </div>
    </section>
  );
};

const CarouselContainer = styled.div`
  position: relative;
  height: 600px;
  perspective: 2000px;
  margin: 4rem 0;

  .carousel-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-controls {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translateY(-50%);
    display: flex;
    justify-content: space-between;
    padding: 0 2rem;
    pointer-events: none;
    z-index: 100;
  }

  .nav-btn {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: white;
    border: none;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;
    pointer-events: all;

    svg {
      width: 24px;
      height: 24px;
      color: #f97316;
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(249, 115, 22, 0.3);
    }
  }

  .indicator-dots {
    position: absolute;
    bottom: -3rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.75rem;
    z-index: 100;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #e5e7eb;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;

    &.active {
      background: #f97316;
      width: 32px;
      border-radius: 6px;
    }

    &:hover {
      background: #fb923c;
    }
  }

  @media (max-width: 768px) {
    height: 520px;
    
    .nav-controls {
      padding: 0 1rem;
    }

    .nav-btn {
      width: 40px;
      height: 40px;

      svg {
        width: 20px;
        height: 20px;
      }
    }
  }
`;

const CarouselCard = styled.div`
  position: absolute;
  width: 380px;
  height: 500px;
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  transform-style: preserve-3d;

  ${props => props.isCenter && `
    cursor: default;
  `}

  .card-inner {
    width: 100%;
    height: 100%;
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
    background: white;
    display: flex;
    flex-direction: column;
  }

  &:hover .card-inner {
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
  }

  .icon-section {
    flex: 1.2;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 30% 50%, rgba(255, 255, 255, 0.3), transparent);
    }
  }

  .icon-wrapper {
    position: relative;
    z-index: 2;
    animation: float 3s ease-in-out infinite;
    filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.2));

    svg {
      display: block;
    }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-15px); }
  }

  .icon-glow {
    position: absolute;
    width: 250px;
    height: 250px;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
    border-radius: 50%;
    animation: pulse 2s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.5; }
    50% { transform: scale(1.2); opacity: 0.3; }
  }

  .content-section {
    flex: 1;
    position: relative;
    padding: 2.5rem 2rem;
  }

  .glass-bg {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.85));
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border-top: 1px solid rgba(255, 255, 255, 0.5);

    &::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, transparent, rgba(249, 115, 22, 0.05));
    }
  }

  .content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .stat-number {
    font-size: 3.5rem;
    font-weight: 800;
    background: linear-gradient(135deg, #f97316, #fb923c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    margin-bottom: 0.75rem;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.2));
  }

  .stat-label {
    font-size: 1.4rem;
    font-weight: 700;
    color: #111827;
    margin-bottom: 1rem;
    line-height: 1.3;
  }

  .stat-description {
    font-size: 0.95rem;
    color: #6b7280;
    line-height: 1.6;
  }

  @media (max-width: 768px) {
    width: 320px;
    height: 450px;

    .icon-wrapper svg {
      width: 60px;
      height: 60px;
    }

    .content-section {
      padding: 2rem 1.5rem;
    }

    .stat-number {
      font-size: 2.8rem;
    }

    .stat-label {
      font-size: 1.2rem;
    }

    .stat-description {
      font-size: 0.85rem;
    }
  }
`;

export default PortfolioStats;