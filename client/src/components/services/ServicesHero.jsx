import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Circle } from "lucide-react";
import { serviceCategories } from "../../assets/assets.js";
import { CheckIcon } from "./ServiceHero.jsx";
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

const ServicesHero = () => {
  const totalCategories = serviceCategories.length;
  const totalServices = serviceCategories.reduce(
    (sum, category) => sum + category.services.length,
    0
  );

  const badges = [
    { icon: CheckIcon, label: `${totalServices}+ Specialized Engagements` },
    { icon: CheckIcon, label: `${totalCategories} Core Disciplines` },
    { icon: CheckIcon, label: 'Concept-to-Production Support' },
  ];

  const actions = [
    <Link
      key="contact"
      to="/contact"
      className={heroPrimaryButtonClass}
    >
      Talk to an Engineer
    </Link>,
    <Link
      key="portfolio"
      to="/portfolio"
      className={heroSecondaryButtonClass}
    >
      See Work in Action
    </Link>,
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
          {/* <Circle className="h-2 w-2 fill-orange-500/80" />
          <span className="text-sm text-gray-600 tracking-wide font-medium">
            Our Services
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
              End-to-End
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-600 via-gray-800 to-gray-600">
              Engineering Services
            </span>
          </h1>
        </motion.div>

        <motion.div
          custom={2}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          {/* <p className={`${heroParagraphClass} max-w-2xl mx-auto`}>
            Design • QA • Analysis handled by a single India-based partner.
          </p> */}
        </motion.div>

        {/* Stats Badges */}
        <motion.div
          custom={3}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-gray-300 backdrop-blur-sm shadow-sm"
            >
              <badge.icon className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-gray-700 font-medium">
                {badge.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          custom={4}
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          {actions}
        </motion.div>
      </div>
    </HeroSection>
  );
};

export default ServicesHero;