import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [width, setWidth] = useState(window.innerWidth);

  //set the width at state
  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    //calculate it with the listener
    window.addEventListener('resize', handleResize);

    //remove it
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  //return the value
  return { width };
};

export default useWindowSize;
