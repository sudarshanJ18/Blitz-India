import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Custom Link component that ensures scroll to top on navigation
 * Provides consistent user experience across all internal links
 */
const ScrollLink = ({ to, children, onClick, ...props }) => {
  const handleClick = (e) => {
    // Execute any custom onClick handler first
    if (onClick) {
      onClick(e);
    }
    
    // Prevent default behavior only if we're handling navigation ourselves
    // Otherwise, let React Router handle navigation normally
    if (!e.defaultPrevented) {
      // Scroll to top instantly
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

export default ScrollLink;