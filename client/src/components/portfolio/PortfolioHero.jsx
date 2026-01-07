import React, { useState, useEffect, useRef, memo } from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { Link } from "react-router-dom";
import {
  HeroSection,
  fadeUpVariants,
  heroBadgeClass,
  heroContainerClass,
  heroHeadingClass,
  heroParagraphClass,
  heroPrimaryButtonClass,
  heroSecondaryButtonClass,
} from "../common/HeroSection";


const CountUp = memo(({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px' 
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    
    if (prefersReducedMotion.current) {
      setCount(end);
      return;
    }

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(easeOutQuart * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration]);

  return (
    <span ref={ref} className="font-black" style={{ willChange: 'contents' }}>
      {count}{suffix}
    </span>
  );
});

CountUp.displayName = 'CountUp';

const PortfolioHero = () => {
  const stats = [
    { number: 200, suffix: "+", label: "Launch-ready programs" },
    { number: 15, suffix: "+", label: "Industries served" },
    { number: 50, suffix: "+", label: "OEM & Tier-1 partners" },
  ];

  return (
    <HeroSection>
      <div className={`${heroContainerClass} text-center`}>
        <motion.div
          custom={0}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className={`${heroBadgeClass} mb-8`}
        >

        </motion.div>

        <motion.div
          custom={1}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >
          <h1 className={`${heroHeadingClass} mb-6`}>
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
              Product Proof
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-gray-800 to-gray-600">
              Design • QA • Analysis
            </span>
          </h1>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
        >

        </motion.div>

        
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="group flex flex-col items-center gap-2 px-8 py-5 rounded-2xl bg-gradient-to-br from-white via-orange-50/30 to-white border-2 border-orange-200/50 backdrop-blur-sm shadow-lg hover:shadow-xl hover:border-orange-300 transition-all duration-300 hover:-translate-y-1 min-w-[200px]"
            >
              <div className="flex items-center gap-2">
                <Circle className="h-2.5 w-2.5 fill-orange-500 text-orange-500 animate-pulse" />
                <span className="text-4xl md:text-5xl font-black bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                  <CountUp end={stat.number} suffix={stat.suffix} duration={2500} />
                </span>
              </div>
              <span className="text-sm md:text-base text-gray-700 font-semibold text-center leading-tight">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/contact"
            className={heroPrimaryButtonClass}
          >
            Start Your Project
            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>

        </motion.div>
      </div>
    </HeroSection>
  );
};

export default PortfolioHero;
