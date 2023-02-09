import React from 'react';
import DashboardSideBoards from '../dashboard/dashboardSide/DashboardSideBoards';
import style from './Modal.module.scss';

const Modal = ({ type }) => {
  if (type === 'showAllBoards') {
    return (
      <div className={style.backdrop}>
        <DashboardSideBoards />
      </div>
    );
  }
};

export default Modal;
