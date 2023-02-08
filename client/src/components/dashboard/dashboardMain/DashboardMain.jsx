import React from 'react';
import style from './DashboardMain.module.scss';

const DashboardMain = ({ isVisible }) => {
  return (
    <div className={isVisible ? style['board'] : style['board--move']}>
      DashboardMain
    </div>
  );
};

export default DashboardMain;
