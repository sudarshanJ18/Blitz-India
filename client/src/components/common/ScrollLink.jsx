import React from 'react';
import { Link } from 'react-router-dom';


const ScrollLink = ({ to, children, onClick, ...props }) => {
  const handleClick = (e) => {
    
    if (onClick) {
      onClick(e);
    }
    
    
    
    if (!e.defaultPrevented) {
      
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