import React from 'react';
import style from './DashboardSide.module.scss';

const DashboardSide = ({ isVisible, setVisibility }) => {
  return (
    <div className={isVisible ? style['side'] : style['side--hidden']}>
      DashboardSide
      <button onClick={setVisibility}>hide side</button>
    </div>
  );
};

export default DashboardSide;
