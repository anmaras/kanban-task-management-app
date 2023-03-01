import React, { useContext, useState } from 'react';

const initialState = {
  asideIsVisible: true,
  createBoardVisible: false,
  sideBoardModalVisible: false,
  editBoardVisible: false,
  deleteModalVisible: false,
  addColumnModalVisible: false,
  addTaskModalVisible: false,
  viewTaskModalVisible: false,
  deleteTaskModalVisible: false,
  updateTaskModalVisible: false,
  editAccountModalVisible: false,
  deleteAccountModalVisible: false,
};

const ModalsContext = React.createContext();

export const ModalProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const asideVisibilityToggle = () => {
    setState({ ...state, asideIsVisible: !state.asideIsVisible });
  };

  const createBoardsModalToggle = () => {
    setState({ ...state, createBoardVisible: !state.createBoardVisible });
  };

  const sideBoardsModalToggle = () => {
    setState({ ...state, sideBoardModalVisible: !state.sideBoardModalVisible });
  };

  const editBoardsModalToggle = () => {
    setState({
      ...state,
      editBoardVisible: !state.editBoardVisible,
      sideBoardModalVisible: false,
    });
  };

  const deleteBoardsModalToggle = () => {
    setState({
      ...state,
      deleteModalVisible: !state.deleteModalVisible,
      sideBoardModalVisible: false,
    });
  };

  const addColumnModalToggle = () => {
    setState({ ...state, addColumnModalVisible: !state.addColumnModalVisible });
  };

  const addTaskModalToggle = () => {
    setState({ ...state, addTaskModalVisible: !state.addTaskModalVisible });
  };

  const viewTaskModalToggle = () => {
    setState({ ...state, viewTaskModalVisible: !state.viewTaskModalVisible });
  };

  const deleteTaskModalToggle = () => {
    setState({
      ...state,
      deleteTaskModalVisible: !state.deleteTaskModalVisible,
      viewTaskModalVisible: false,
    });
  };

  const editTaskModalToggle = () => {
    setState({
      ...state,
      updateTaskModalVisible: !state.updateTaskModalVisible,
      viewTaskModalVisible: false,
    });
  };

  const editAccountTaskModalToggle = () => {
    setState({
      ...state,
      editAccountModalVisible: !state.editAccountModalVisible,
    });
  };

  const deleteAccountModalToggle = () => {
    setState({
      ...state,
      deleteAccountModalVisible: !state.deleteAccountModalVisible,
      editAccountModalVisible: false,
    });
  };

  const closeModals = () => {
    setState({
      ...state,
      createBoardVisible: false,
      sideBoardModalVisible: false,
      editBoardVisible: false,
      deleteModalVisible: false,
      addColumnModalVisible: false,
      addTaskModalVisible: false,
      viewTaskModalVisible: false,
      deleteTaskModalVisible: false,
      updateTaskModalVisible: false,
      editAccountModalVisible: false,
      deleteAccountModalVisible: false,
    });
  };

  return (
    <ModalsContext.Provider
      value={{
        ...state,
        closeModals,
        asideVisibilityToggle,
        createBoardsModalToggle,
        sideBoardsModalToggle,
        editBoardsModalToggle,
        deleteBoardsModalToggle,
        addColumnModalToggle,
        addTaskModalToggle,
        viewTaskModalToggle,
        deleteTaskModalToggle,
        editTaskModalToggle,
        editAccountTaskModalToggle,
        deleteAccountModalToggle,
      }}
    >
      {children}
    </ModalsContext.Provider>
  );
};
export const useModalContext = () => {
  return useContext(ModalsContext);
};
