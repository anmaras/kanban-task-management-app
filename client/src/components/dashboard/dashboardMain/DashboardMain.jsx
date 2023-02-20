import React from 'react';
import style from './DashboardMain.module.scss';
import { useBoardContext } from '../../../context/boardsContext';
import DashboardMainOptions from './DashboardMainOptions';
import DashboardMainList from './DashboardMainList';

const DashboardMain = ({ isVisible }) => {
  const { boards } = useBoardContext();

  return (
    <div className={isVisible ? style['board'] : style['board--move']}>
      {boards?.length === 0 ? (
        <DashboardMainOptions isVisible={isVisible} />
      ) : (
        <DashboardMainList />
      )}
    </div>
  );
};

export default DashboardMain;
