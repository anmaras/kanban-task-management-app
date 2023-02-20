import React from 'react';
import { PulseLoader, PropagateLoader } from 'react-spinners';

const Spinner = ({ type }) => {
  if (type === 'big') {
    return <PropagateLoader color="#ffffff" size={15} />;
  }

  return <PulseLoader color="#ffffff" size={5} />;
};

export default Spinner;
