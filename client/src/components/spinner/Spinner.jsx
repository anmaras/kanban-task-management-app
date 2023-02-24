import React from 'react';
import { PulseLoader, PropagateLoader } from 'react-spinners';

const Spinner = ({ type, color = '#ffffff' }) => {
  if (type === 'big') {
    return <PropagateLoader color="#ffffff" size={15} />;
  }

  return <PulseLoader color={color} size={5} />;
};

export default Spinner;
