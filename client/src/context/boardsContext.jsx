import React, { useContext, useReducer, useEffect } from 'react';
import { useUserContext } from './userContext';
import reducer from '../reducers/boardsReducer';
import axios from 'axios';

import {
  CREATE_BOARD_BEGIN,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  SIDE_CREATE_MODAL_TOGGLE,
  CREATE_NEW_BOARD_MODAL_TOGGLE,
  DELETE_MODAL_TOGGLE,
  CLOSE_MODAL,
  GET_USER_BOARD_BEGIN,
  GET_USER_BOARD_SUCCESS,
  GET_USER_BOARD_ERROR,
  GET_USER_BOARD_COLUMN_SUCCESS,
  DELETE_BOARD_BEGIN,
  DELETE_BOARD_SUCCESS,
  DELETE_BOARD_ERROR,
  EDIT_BOARD_BEGIN,
  EDIT_BOARD_SUCCESS,
  EDIT_BOARD_ERROR,
  CREATE_COLUMN_TASK_BEGIN,
  CREATE_COLUMN_TASK_SUCCESS,
  CREATE_COLUMN_TASK_ERROR,
  EDIT_BOARD_MODAL_TOGGLE,
  ADD_COLUMN_MODAL_TOGGLE,
  ADD_TASK_MODAL_TOGGLE,
  VIEW_TASK_MODAL_TOGGLE,
  GET_CURRENT_TASK,
  EDIT_SUBTASK,
  MOVE_TASK,
  DELETE_TASK_BEGIN,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_MODAL_TOGGLE,
  UPDATE_TASK_MODAL_TOGGLE,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  DND_TASK_BEGIN,
  DND_TASK_SUCCESS,
  DND_TASK_ERROR,
} from '../utils/actions';

export const initialState = {
  isLoading: false,
  boards: [],
  totalBoards: 0,
  fetchDataLoading: false,
  createBoardVisible: false,
  sideBoardModalVisible: false,
  deleteModalVisible: false,
  editBoardVisible: false,
  addColumnModalVisible: false,
  addTaskModalVisible: false,
  viewTaskModalVisible: false,
  deleteTaskModalVisible: false,
  updateTaskModalVisible: false,
  activeBoardId: '',
  activeBoard: {},
  task: {},
  activeColumn: [],
};

const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token, user, logoutUser } = useUserContext();

  const handleCreateBoardModal = () => {
    dispatch({ type: CREATE_NEW_BOARD_MODAL_TOGGLE });
  };

  const handleEditBoardModal = () => {
    dispatch({ type: EDIT_BOARD_MODAL_TOGGLE });
  };

  const handleSideBoardModal = () => {
    dispatch({ type: SIDE_CREATE_MODAL_TOGGLE });
  };

  const handleDeleteBoardModal = () => {
    dispatch({ type: DELETE_MODAL_TOGGLE });
  };

  const handleAddColumnModal = () => {
    dispatch({ type: ADD_COLUMN_MODAL_TOGGLE });
  };

  const handleAddTaskModal = () => {
    dispatch({ type: ADD_TASK_MODAL_TOGGLE });
  };

  const handleViewTaskModal = () => {
    dispatch({ type: VIEW_TASK_MODAL_TOGGLE });
  };

  const handleDeleteTaskModal = () => {
    dispatch({ type: DELETE_TASK_MODAL_TOGGLE });
  };

  const handleEditTaskModal = () => {
    dispatch({ type: UPDATE_TASK_MODAL_TOGGLE });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const createBoard = async (values) => {
    dispatch({ type: CREATE_BOARD_BEGIN });

    try {
      const { data } = await axios.post('/api/v1/boards/create-board', values, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: CREATE_BOARD_SUCCESS, payload: data });
      closeModal();
    } catch (error) {
      dispatch({ type: CREATE_BOARD_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const getUserBoards = async () => {
    dispatch({ type: GET_USER_BOARD_BEGIN });
    try {
      const { data } = await axios.get('/api/v1/boards/get-user-boards', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: GET_USER_BOARD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_BOARD_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const getActiveBoardId = async (activeBoardId) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/boards/get-user-boards/active/board/${activeBoardId}`,
        { isActive: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GET_USER_BOARD_COLUMN_SUCCESS, payload: data });
    } catch (error) {
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const deleteBoard = async () => {
    dispatch({ type: DELETE_BOARD_BEGIN });
    try {
      const { data } = await axios.delete(
        `/api/v1/boards/get-user-boards/board/${state.activeBoardId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: DELETE_BOARD_SUCCESS, payload: data });
      closeModal();
    } catch (error) {
      dispatch({ type: DELETE_BOARD_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const editBoard = async (values) => {
    dispatch({ type: EDIT_BOARD_BEGIN });
    try {
      const { data } = await axios.patch(
        `/api/v1/boards/get-user-boards/board/${state.activeBoardId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: EDIT_BOARD_SUCCESS, payload: data });
      closeModal();
    } catch (error) {
      dispatch({ type: EDIT_BOARD_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const addNewTask = async (values) => {
    const { columnId } = values;

    dispatch({ type: CREATE_COLUMN_TASK_BEGIN });
    try {
      const { data } = await axios.post(
        `/api/v1/boards/get-user-boards/board/${state.activeBoardId}/column/${columnId}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: CREATE_COLUMN_TASK_SUCCESS,
        payload: data,
      });
      closeModal();
    } catch (error) {
      dispatch({ type: CREATE_COLUMN_TASK_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const getCurrentTask = (task) => {
    dispatch({ type: GET_CURRENT_TASK, payload: task });
  };

  const editSubTaskCheckBox = async (subtaskId, columnId) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/boards/board/${state.activeBoardId}/column/${columnId}/task/${state.task._id}/subtask/${subtaskId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: EDIT_SUBTASK, payload: data });
    } catch (error) {
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const moveTasks = async (from, columnId) => {
    try {
      const { data } = await axios.patch(
        `/api/v1/boards/board/${state.activeBoardId}/column/${from}/task/${state.task._id}/move`,
        { activeTask: state.task, toId: columnId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: MOVE_TASK, payload: data });
    } catch (error) {
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const deleteTask = async () => {
    const { activeBoardId, activeColumn, task } = state;

    dispatch({ type: DELETE_TASK_BEGIN });
    try {
      const { data } = await axios.delete(
        `api/v1/boards/board/${activeBoardId}/column/${activeColumn._id}/task/${task._id}/delete`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
      closeModal();
    } catch (error) {
      dispatch({ type: DELETE_TASK_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const editTask = async (values) => {
    dispatch({ type: EDIT_TASK_BEGIN });
    try {
      const { data } = await axios.patch(
        `api/v1/boards/board/${state.activeBoardId}/column/${state.activeColumn._id}/task/${state.task._id}/edit`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: EDIT_TASK_SUCCESS, payload: data });
      closeModal();
    } catch (error) {
      dispatch({ type: EDIT_TASK_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  const dndTask = async (values) => {
    dispatch({ type: DND_TASK_BEGIN });
    try {
      const { data } = await axios.patch(
        `api/v1/boards/board/${state.activeBoardId}/tasks/dnd`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: DND_TASK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DND_TASK_ERROR });
      if (error.request.status === 401) {
        logoutUser();
      }
    }
  };

  useEffect(() => {
    getUserBoards();
  }, [user, token]);
  return (
    <BoardContext.Provider
      value={{
        ...state,
        createBoard,
        handleDeleteTaskModal,
        handleCreateBoardModal,
        handleSideBoardModal,
        closeModal,
        getUserBoards,
        getActiveBoardId,
        handleDeleteBoardModal,
        deleteBoard,
        editBoard,
        handleEditBoardModal,
        handleAddColumnModal,
        handleAddTaskModal,
        addNewTask,
        handleViewTaskModal,
        getCurrentTask,
        editSubTaskCheckBox,
        moveTasks,
        deleteTask,
        handleEditTaskModal,
        editTask,
        dndTask,
      }}
    >
      {children}
    </BoardContext.Provider>
  );
};
//export a small hook for convenient when destructuring on components
export const useBoardContext = () => {
  return useContext(BoardContext);
};
