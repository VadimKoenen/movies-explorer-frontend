import { useState, useEffect } from 'react';

export const useResize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (event) => {
      (function throttle() { 
        setTimeout(() => {
          setWidth(event.target.innerWidth)
      }, 1000);
      }())
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    isWideScreen: width >= 1280,
    isSubMiddleScreen: width >= 1201 && width <= 1279,
    isMiddleScreen: width >= 720 && width <= 1200,
    isNarrowScreen: width <= 767,
  };
};