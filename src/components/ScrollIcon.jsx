// ScrollIcon.js
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ScrollIcon.css';

const ScrollIcon = ({ isSmallScreen }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`icon-scroll ${visible ? '' : 'fade-out'}`}
      style={{
        left: isSmallScreen ? '60%' : '35%', 
        bottom: isSmallScreen ? '90%' : '90%', 
      }}
    >
      <div className="icon-scroll-before"></div>
    </div>
  );
};

ScrollIcon.propTypes = {
  isSmallScreen: PropTypes.bool.isRequired,
};

export default ScrollIcon;
