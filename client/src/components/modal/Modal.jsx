import React, { memo } from 'react';
import DashboardSideBoards from '../dashboard/dashboardSide/DashboardSideBoards';
import {
  Backdrop,
  BoardModals,
  DeleteModal,
  TaskModal,
  ViewTaskModal,
} from './index';

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
        <BoardModals type="create" />
      </Backdrop>
    );
  }

  if (type === 'editBoardModal') {
    return (
      <Backdrop>
        <BoardModals type="edit" />
      </Backdrop>
    );
  }

  if (type === 'deleteBoardModal') {
    return (
      <Backdrop>
        <DeleteModal type="board" />
      </Backdrop>
    );
  }

  if (type === 'addNewColumn') {
    return (
      <Backdrop>
        <BoardModals type="addColumn" />
      </Backdrop>
    );
  }

  if (type === 'viewTaskModal') {
    return (
      <Backdrop>
        <ViewTaskModal />
      </Backdrop>
    );
  }

  if (type === 'addTaskModal') {
    return (
      <Backdrop>
        <TaskModal type="addTask" />
      </Backdrop>
    );
  }

  if (type === 'deleteTaskModal') {
    return (
      <Backdrop>
        <DeleteModal type="task" />
      </Backdrop>
    );
  }
};

export default memo(Modal);
