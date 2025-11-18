"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React from "react";

export const Highlight = ({
  children,
  className = "",
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: "0% 100%",
      }}
      animate={{
        backgroundSize: "100% 100%",
      }}
      transition={{
        duration: 2,
        ease: "linear",
        delay: 0.5,
      }}
      style={{
        backgroundImage:
          "linear-gradient(to right, #f97316, #ea580c, #f97316)",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "left center",
        display: "inline",
      }}
      className={cn(
        `relative inline-block pb-1 px-1 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600`,
        className
      )}
    >
      {children}
    </motion.span>
  );
};

export const HeroHighlight = ({
  children,
  className = "",
  containerClassName = "",
}) => {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center w-full",
        containerClassName
      )}
    >
      <div className="absolute inset-0 bg-white"></div>
      
      <div className={cn("relative z-10 w-full", className)}>
        {children}
      </div>
    </div>
  );
};

