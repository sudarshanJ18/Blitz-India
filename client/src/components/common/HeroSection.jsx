import React from "react";
import { motion } from "framer-motion";
import Threads from "../ui/Threads";
import MechanicalDecorations from "../ui/MechanicalDecorations";

const HeroBackdrop = () => (
  <>
    
    <div className="absolute inset-0 overflow-hidden">
      <Threads
        color={[0.95, 0.45, 0.15]} 
        amplitude={1.2}
        distance={0}
        enableMouseInteraction={true}
      />
    </div>

    
    

    
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.02] via-transparent to-gray-600/[0.02]" />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-100/60 via-transparent to-white/40 pointer-events-none" />
  </>
);

const heroSectionClass =
  "relative min-h-[75vh] md:min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100";
const heroContentWrapperClass =
  "relative z-10 w-full py-12 md:py-16 lg:py-20";
const heroContainerClass = "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8";
const heroBadgeClass =
  "inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/80 border border-gray-200 backdrop-blur-sm shadow-sm";
const heroHeadingClass =
  "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight";
const heroParagraphClass =
  "text-lg sm:text-xl text-gray-600 leading-relaxed font-light tracking-wide";
const heroPrimaryButtonClass =
  "group inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-[1.015] shadow-lg hover:shadow-orange-600/30 border border-orange-600/20";
const heroSecondaryButtonClass =
  "group inline-flex items-center justify-center px-6 py-3 text-base font-semibold rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all duration-300 transform hover:scale-[1.015] shadow-sm";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      delay: 0.45 + i * 0.2,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }),
};

const HeroSection = ({ children, className = "", ...props }) => (
  <section className={`${heroSectionClass} ${className}`} {...props}>
    <HeroBackdrop />
    <div className={heroContentWrapperClass}>{children}</div>
  </section>
);

export {
  HeroSection,
  HeroBackdrop,
  fadeUpVariants,
  heroBadgeClass,
  heroContainerClass,
  heroHeadingClass,
  heroParagraphClass,
  heroPrimaryButtonClass,
  heroSecondaryButtonClass,
};
