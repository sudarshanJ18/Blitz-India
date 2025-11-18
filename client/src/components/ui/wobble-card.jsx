"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const cn = (...classes) => classes.filter(Boolean).join(" ");

export const WobbleCard = ({
  children,
  containerClassName,
  className,
  onClick,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef(null);

  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = (clientX - rect.left) / rect.width;
    const y = (clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  // 3D tilt effect
  const rotateX = (mousePosition.y - 0.5) * 10;
  const rotateY = (mousePosition.x - 0.5) * -10;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0.5, y: 0.5 });
      }}
      style={{
        transform: isHovering 
          ? `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
        transition: "transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
      }}
      className={cn(
        "relative overflow-hidden w-full h-full rounded-2xl",
        "bg-white border border-gray-200",
        "shadow-sm hover:shadow-lg",
        "transition-shadow duration-300",
        containerClassName
      )}
      onClick={onClick}
    >
      {/* Main content */}
      <div
        className={cn(
          "relative z-10 w-full h-full flex items-center justify-center p-6",
          className
        )}
      >
        {children}
      </div>
      
      {/* Subtle light reflection */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
            rgba(255, 255, 255, 0.8), 
            transparent 40%)`,
        }}
        animate={{
          opacity: isHovering ? 0.3 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Depth shadow effect */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        style={{
          boxShadow: `
            ${(mousePosition.x - 0.5) * -40}px 
            ${(mousePosition.y - 0.5) * -40}px 
            60px rgba(0, 0, 0, 0.1) inset`,
        }}
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default WobbleCard;