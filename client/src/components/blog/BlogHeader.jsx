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

const BlogHeader = () => {
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
            Engineering Insights
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
Blogs
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-gray-800 to-gray-600">
              Engineering Insights
            </span>
          </h1>
        </motion.div>

        

        {/* Additional info badges */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {[
            "50+ Engineering Articles",
            "10+ Technical Guides",
            "Expert Insights",
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
          
        </motion.div>
      </div>
    </HeroSection>
  );
};

export default BlogHeader;