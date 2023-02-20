import React from 'react';
import { useBoardContext } from '../../context/boardsContext';
import { Modal } from '../index';
import useWindowSize from '../../hooks/useWindowSize';

const PortalComponents = () => {
  const { width } = useWindowSize();

  const {
    deleteModalVisible,
    sideBoardModalVisible,
    createBoardVisible,
    editBoardVisible,
    addColumnModalVisible,
    addTaskModalVisible,
    viewTaskModalVisible,
    deleteTaskModalVisible,
    updateTaskModalVisible,
  } = useBoardContext();
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
    </>
  );
};

export default PortalComponents;
