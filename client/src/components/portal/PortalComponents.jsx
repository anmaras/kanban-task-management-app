import React from 'react';
import { AnimatePresence } from 'framer-motion';
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
    <AnimatePresence>
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
    </AnimatePresence>
  );
};

export default PortalComponents;
