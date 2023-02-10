import React from 'react';
import DashboardSideBoards from '../dashboard/dashboardSide/DashboardSideBoards';
import style from './Modal.module.scss';
import { useBoardContext } from '../../context/boardsContext';

const Modal = ({ type }) => {
  const { closeModal } = useBoardContext();
  if (type === 'showAllBoards') {
    return (
      <div className={style.backdrop} onClick={closeModal}>
        <DashboardSideBoards />
      </div>
    );
  }
};

export default Modal;
