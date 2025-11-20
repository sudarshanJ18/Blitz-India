import React, { useEffect, useRef, useState } from 'react';
import { values } from "../../assets/assets";

// Simple scroll reveal hook
const useScrollReveal = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const {
    threshold = 0.1,
    delay = 0,
    duration = 800,
    baseOpacity = 0,
    enableBlur = false,
    baseRotation = 0,
    blurStrength = 10,
    baseScale = 1
  } = options;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const style = {
    opacity: isVisible ? 1 : baseOpacity,
    transform: isVisible 
      ? 'translateY(0) rotate(0) scale(1)' 
      : `translateY(30px) rotate(${baseRotation}deg) scale(${baseScale})`,
    filter: enableBlur && !isVisible ? `blur(${blurStrength}px)` : 'blur(0)',
    transition: `all ${duration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
    transitionDelay: `${delay}ms`
  };

  return { ref, style };
};

// Scroll Reveal Component
const ScrollReveal = ({ children, ...options }) => {
  const { ref, style } = useScrollReveal(options);
  
  return (
    <div ref={ref} style={style}>
      {children}
    </div>
  );
};

// Floating Image Component
const FloatingImage = ({ src, alt, delay = 0, rotation = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative group cursor-pointer transition-all duration-700 ${isHovered ? 'scale-105' : 'scale-100'}`}
      style={{
        animation: `float 6s ease-in-out infinite ${delay}s`,
        transform: `rotate(${rotation}deg)`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
      <img
        src={src}
        alt={alt}
        className="relative z-10 w-full h-48 object-cover rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-500 border-2 border-white/20 group-hover:border-blue-300/30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
};

const AboutSection = () => {
  // Using imported local images
  const images = [
    {
      src: values.about1,
      alt: "Engineering Design",
      rotation: -3,
      delay: 0
    },
    {
      src: values.about2,
      alt: "Technical Analysis",
      rotation: 2,
      delay: 0.2
    },
    {
      src: values.about3,
      alt: "Quality Assurance",
      rotation: -1,
      delay: 0.4
    }
  ];

  return (
    <section className="py-12 bg-white-50 white:bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Image Grid Section */}
          <ScrollReveal
            baseOpacity={0}
            enableBlur={true}
            baseRotation={-5}
            blurStrength={15}
            baseScale={0.9}
            delay={200}
          >
            <div className="relative">
              {/* Background decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-purple-500/10 rounded-full blur-xl"></div>
              
              {/* Main image grid */}
              <div className="grid grid-cols-2 gap-4 relative z-10">
                {images.map((image, index) => (
                  <div 
                    key={index} 
                    className={index === 0 ? "col-span-2" : "col-span-1"}
                  >
                    <FloatingImage
                      src={image.src}
                      alt={image.alt}
                      rotation={image.rotation}
                      delay={image.delay}
                    />
                  </div>
                ))}
              </div>
              
              {/* Floating elements */}
              <div className="absolute top-1/2 -right-8 w-16 h-16 bg-yellow-500/20 rounded-full blur-lg animate-pulse"></div>
              <div className="absolute bottom-8 -left-8 w-12 h-12 bg-green-500/20 rounded-full blur-lg animate-pulse delay-1000"></div>
            </div>
          </ScrollReveal>

          {/* Content Section */}
          <div className="space-y-6">
            <ScrollReveal
              baseOpacity={0}
              enableBlur={true}
              baseRotation={10}
              blurStrength={15}
              baseScale={0.95}
            >
              <div className="space-y-6">
                <h2 className="text-3xl lg:text-4xl font-bold text-black-900 white:text-white leading-tight font-serif tracking-tight">
                Engineering Excellence 
                  <span className="text-black-600 block mt-2">Global Excellence</span>
                </h2>
                
                <div className="space-y-5">
                  <p className="text-base sm:text-lg font-medium text-black-600 white:text-gray-300 leading-relaxed tracking-wide">
                    Accelerating innovation with cutting-edge engineering solutions, 
                    rigorous quality standards, and seamless global delivery from India's 
                    premier technical hub.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(var(--rotation, 0deg)); }
          50% { transform: translateY(-10px) rotate(var(--rotation, 0deg)); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;