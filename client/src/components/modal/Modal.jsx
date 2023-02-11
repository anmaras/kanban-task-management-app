import React from 'react';
import DashboardSideBoards from '../dashboard/dashboardSide/DashboardSideBoards';
import { Backdrop, BoardModals } from './index';

const Modal = ({ type }) => {
  if (type === 'sideBoardsModal') {
    return (
      <Backdrop>
        <DashboardSideBoards />
      </Backdrop>
    );
  }

  if (type === 'createBoardModal') {
    return (
      <Backdrop>
        <BoardModals />
      </Backdrop>
    );
  }
};

export default Modal;
