import React from 'react';
import style from './DashboardMain.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import DashboardMainOptions from './DashboardMainOptions';
import DashboardMainList from './DashboardMainList';

const DashboardMain = ({ isVisible }) => {
  const { boards } = useBoardContext();

  if (!boards.length) {
    return <DashboardMainOptions isVisible={isVisible} />;
  }

  return (
    <div className={isVisible ? style['board'] : style['board--move']}>
      <DashboardMainList />
    </div>
  );
};

export default DashboardMain;
