import React from 'react';
import style from './DashboardSide.module.scss';
import DashboardSideBoards from './DashboardSideBoards';
import { ReactComponent as Eye } from '../../../assets/icon-hide-sidebar.svg';

const DashboardSide = ({ isVisible, setVisibility }) => {
  return (
    <div className={isVisible ? style['side'] : style['side--hidden']}>
      <DashboardSideBoards />
      <button onClick={setVisibility} className={style['side__hideBtn']}>
        <Eye />
        <span className="heading-M">Hide Sidebar</span>
      </button>
    </div>
  );
};

export default DashboardSide;
