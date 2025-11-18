"use client";
import React from "react";

export function Button({ 
  children = "Click Me", 
  onClick, 
  className = "",
  variant = "default",
  size = "md",
  ...props 
}) {
  // Size classes
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  };

  // Variant classes
  const variantClasses = {
    default: `
      relative rounded-full
      bg-white dark:bg-black
      text-black dark:text-white
      font-medium
      transition-all duration-300
      hover:shadow-lg
      before:absolute before:inset-0 
      before:rounded-full before:p-[2px]
      before:bg-gradient-to-r before:from-blue-500 before:via-purple-500 before:to-pink-500
      before:-z-10
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
    `,
    secondary: `
      bg-orange-600 hover:bg-orange-700
      text-white
      rounded-full
      font-medium
      transition-all duration-300
      hover:shadow-lg
    `,
    outline: `
      border-2 border-white
      bg-transparent
      text-white
      rounded-full
      font-medium
      transition-all duration-300
      hover:bg-white hover:text-blue-600
    `,
    primary: `
      bg-blue-600 hover:bg-blue-700
      text-white
      rounded-full
      font-medium
      transition-all duration-300
      hover:shadow-lg
    `
  };

  // Get base classes based on variant
  const baseClasses = variantClasses[variant] || variantClasses.default;
  
  // Check if variant is default to apply gradient effect
  const hasGradientEffect = variant === "default";

  return (
    <button
      onClick={onClick}
      className={`
        ${baseClasses}
        ${sizeClasses[size]}
        ${className}
      `.trim().replace(/\s+/g, ' ')}
      {...props}
    >
      {hasGradientEffect ? (
        <span className="relative z-10">{children}</span>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;