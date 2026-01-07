import React, { useState, useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';


const CountUp = memo(({ end, duration = 2000, suffix = "", isPercentage = false }) => {
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
    <span ref={ref} style={{ willChange: 'contents' }}>
      {count}{suffix}
    </span>
  );
});

CountUp.displayName = 'CountUp';

const ServiceOverview = memo(({ service }) => {
  
  const extractNumber = (value) => {
    if (!value) return 0;
    const match = value.toString().match(/\d+/);
    return match ? parseInt(match[0]) : 0;
  };

  const projectsCompleted = extractNumber(service.projectsCompleted || "500");
  const satisfactionRate = extractNumber(service.satisfactionRate || "98");
  const teamExpertise = extractNumber(service.teamSize || "15");

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-gray-800 mb-6">
              Service Overview
            </h2>
            <div className="prose text-gray-500 mb-8 text-2xl leading-relaxed">
              <p>
                {service.detailedDescription || service.description}
              </p>
            </div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-6 border border-orange-100 shadow-sm"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Key Benefits
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits?.map((benefit, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    </div>
                    <span className="ml-3 text-gray-600">{benefit}</span>
                  </div>
                )) || (
                    <>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600">Cost-effective solutions</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600">Quick turnaround time</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600">High-quality deliverables</span>
                      </div>
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        </div>
                        <span className="ml-3 text-gray-600">Expert consultation</span>
                      </div>
                    </>
                  )}
              </div>
            </motion.div>
          </motion.div>

          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </span>
                Service Statistics
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Projects Completed</span>
                  <span className="text-2xl font-bold text-blue-600">
                    <CountUp end={projectsCompleted} suffix="+" duration={2500} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Client Satisfaction</span>
                  <span className="text-2xl font-bold text-green-600">
                    <CountUp end={satisfactionRate} suffix="%" duration={2500} />
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Average Timeline</span>
                  <span className="text-2xl font-bold text-purple-600">{service.avgTimeline || "2-4 weeks"}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Team Expertise</span>
                  <span className="text-2xl font-bold text-orange-600">
                    <CountUp end={teamExpertise} suffix="+ years" duration={2500} />
                  </span>
                </div>
              </div>
            </motion.div>

            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -5 }}
              className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 border border-gray-100 shadow-lg"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                </span>
                Industry Applications
              </h3>
              <div className="flex flex-wrap gap-2">
                {service.industries?.map((industry, index) => (
                  <span key={index} className="bg-orange-100 text-orange-800 text-xs font-medium px-3 py-1 rounded-full">
                    {industry}
                  </span>
                )) || (
                    <>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Automotive</span>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Aerospace</span>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Manufacturing</span>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Energy</span>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Healthcare</span>
                      <span className="bg-orange-100 text-orange-800 text-s font-medium px-3 py-1 rounded-full">Construction</span>
                    </>
                  )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ServiceOverview.displayName = 'ServiceOverview';

export default ServiceOverview;