import React from 'react';
import { useModalContext } from '../../context/modalsContext';
import { Modal } from '../index';
import useWindowSize from '../../hooks/useWindowSize';

const PortalComponents = () => {
  const { width } = useWindowSize();

  const {
    createBoardVisible,
    sideBoardModalVisible,
    editBoardVisible,
    deleteModalVisible,
    addColumnModalVisible,
    addTaskModalVisible,
    viewTaskModalVisible,
    deleteTaskModalVisible,
    updateTaskModalVisible,
    editAccountModalVisible,
    deleteAccountModalVisible,
  } = useModalContext();
  return (
    <>
      {deleteModalVisible && <Modal type="deleteBoardModal" />}
      {sideBoardModalVisible && width <= 768 && (
        <Modal type="sideBoardsModal" />
      )}
      {createBoardVisible && <Modal type="createBoardModal" />}
      {editBoardVisible && <Modal type="editBoardModal" />}
      {addColumnModalVisible && <Modal type="addNewColumn" />}
      {addTaskModalVisible && <Modal type="addTaskModal" />}
      {viewTaskModalVisible && <Modal type="viewTaskModal" />}
      {deleteTaskModalVisible && <Modal type="deleteTaskModal" />}
      {updateTaskModalVisible && <Modal type="updateTaskModal" />}
      {editAccountModalVisible && <Modal type="editAccount" />}
      {deleteAccountModalVisible && <Modal type="deleteAccount" />}
    </>
  );
};

export default PortalComponents;
