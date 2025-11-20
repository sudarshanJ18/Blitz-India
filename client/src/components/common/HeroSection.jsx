import React from "react";
import { motion } from "framer-motion";

const ElegantShape = ({
  className,
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = "from-gray-400/[0.08]",
}) => (
  <motion.div
    initial={{
      opacity: 0,
      y: -150,
      rotate: rotate - 15,
    }}
    animate={{
      opacity: 1,
      y: 0,
      rotate,
    }}
    transition={{
      duration: 2.4,
      delay,
      ease: [0.23, 0.86, 0.39, 0.96],
      opacity: { duration: 1.2 },
    }}
    className={`absolute ${className}`}
  >
    <motion.div
      animate={{
        y: [0, 15, 0],
      }}
      transition={{
        duration: 12,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      }}
      style={{
        width,
        height,
      }}
      className="relative"
    >
      <div
        className={`
          absolute inset-0 rounded-full
          bg-gradient-to-r to-transparent ${gradient}
          backdrop-blur-[2px] border-2 border-gray-500/20
          shadow-[0_8px_32px_0_rgba(0,0,0,0.08)]
          after:absolute after:inset-0 after:rounded-full
          after:bg-[radial-gradient(circle_at_50%_50%,rgba(120,120,120,0.15),transparent_70%)]
        `}
      />
    </motion.div>
  </motion.div>
);

const HERO_SHAPES = [
  {
    delay: 0.3,
    width: 640,
    height: 160,
    rotate: 12,
    gradient: "from-orange-500/[0.15]",
    className: "left-[-12%] md:left-[-6%] top-[12%] md:top-[18%]",
  },
  {
    delay: 0.45,
    width: 520,
    height: 130,
    rotate: -14,
    gradient: "from-gray-600/[0.14]",
    className: "right-[-8%] md:right-[2%] top-[68%] md:top-[72%]",
  },
  {
    delay: 0.4,
    width: 320,
    height: 90,
    rotate: -8,
    gradient: "from-orange-400/[0.12]",
    className: "left-[4%] md:left-[10%] bottom-[6%] md:bottom-[12%]",
  },
  {
    delay: 0.55,
    width: 220,
    height: 70,
    rotate: 18,
    gradient: "from-gray-500/[0.12]",
    className: "right-[16%] md:right-[22%] top-[10%] md:top-[16%]",
  },
  {
    delay: 0.65,
    width: 160,
    height: 50,
    rotate: -24,
    gradient: "from-orange-300/[0.12]",
    className: "left-[18%] md:left-[26%] top-[6%] md:top-[12%]",
  },
];

const HeroBackdrop = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-orange-500/[0.04] via-transparent to-gray-600/[0.04] blur-3xl" />
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {HERO_SHAPES.map((shape, index) => (
        <ElegantShape key={index} {...shape} />
      ))}
    </div>
    <div className="absolute inset-0 bg-gradient-to-t from-gray-100/80 via-transparent to-white/50 pointer-events-none" />
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

