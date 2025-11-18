import React from "react";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import {
  HeroSection,
  fadeUpVariants,
  heroBadgeClass,
  heroContainerClass,
  heroHeadingClass,
  heroParagraphClass,
} from "../common/HeroSection";

const ContactHeader = () => {
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
            {/* <Circle className="h-2 w-2 fill-orange-500/80" />
            <span className="text-sm text-gray-600 tracking-wide font-medium">
              India-Based Partner
            </span> */}
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={`${heroHeadingClass} mb-6`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
                Let's Build
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-gray-800 to-gray-600">
                Reliable Products
              </span>
            </h1>
          </motion.div>

          <motion.div
            custom={2}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            {/* <p className={`${heroParagraphClass} max-w-2xl mx-auto mb-8`}>
              One message connects you with design, QA, and analysis support.
            </p> */}
          </motion.div>

          {/* Additional info badges */}
          <motion.div
            custom={3}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4 mb-8"
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-300 backdrop-blur-sm shadow-sm">
              <Circle className="h-2 w-2 fill-orange-500/80" />
              <span className="text-sm text-gray-700 font-medium">Reply in 24 hours</span>
              
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-300 backdrop-blur-sm shadow-sm">
              <Circle className="h-2 w-2 fill-orange-500/80" />
              <span className="text-sm text-gray-700 font-medium">Free Consultation</span>
              
            </div>
            
          </motion.div>
      </div>
    </HeroSection>
  );
};

export default ContactHeader;