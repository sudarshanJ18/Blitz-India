import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Circle, Users, Target, Award, Clock } from "lucide-react";
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

const AboutHero = () => {
  return (
    <HeroSection>
      <div className={heroContainerClass}>
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            custom={0}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
            className={`${heroBadgeClass} mb-8`}>
          </motion.div>

          <motion.div
            custom={1}
            variants={fadeUpVariants}
            initial="hidden"
            animate="visible"
          >
            <h1 className={`${heroHeadingClass} mb-6`}>
              <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-700">
                About Blitz India
              </span>
              <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-gray-800 to-gray-600">
                Engineering Excellence
              </span>
            </h1>
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
              "Explore Our Story",
              "Achieve Excellence",
              "Connect with Us",
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
            custom={5}
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
            </Link>
          </motion.div>
        </div>
      </div>
    </HeroSection>
  );
};

export default AboutHero;