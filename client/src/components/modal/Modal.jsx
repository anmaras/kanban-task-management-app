import React, { memo } from 'react';
import { AsideBoardsCard } from '../index';
import {
  Backdrop,
  BoardModals,
  DeleteModal,
  CreateTaskModal,
  ViewTaskModal,
  EditAccountModal,
} from './index';

const Modal = ({ type }) => {
  if (type === 'sideBoardsModal') {
    return (
      <Backdrop>
        <AsideBoardsCard />
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
        <CreateTaskModal type="addTask" />
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
  if (type === 'updateTaskModal') {
    return (
      <Backdrop>
        <CreateTaskModal type="updateTask" />
      </Backdrop>
    );
  }
  if (type === 'editAccount') {
    return (
      <Backdrop>
        <EditAccountModal />
      </Backdrop>
    );
  }

  if (type === 'deleteAccount') {
    return (
      <Backdrop>
        <DeleteModal type="account" />
      </Backdrop>
    );
  }
};

export default memo(Modal);
