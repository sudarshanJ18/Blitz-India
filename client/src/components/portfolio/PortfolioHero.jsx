import React from "react";
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

const PortfolioHero = () => {
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

        {/* Additional info badges */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            "200+ Launch-ready programs",
            "15+ industries served",
            "50+ OEM & Tier-1 partners",
          ].map((text) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-300 backdrop-blur-sm shadow-sm"
            >
              <Circle className="h-2 w-2 fill-orange-500/80" />
              <span className="text-sm text-gray-700 font-medium">{text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
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