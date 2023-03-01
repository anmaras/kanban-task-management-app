import React, { useContext, useReducer, useEffect } from 'react';
import { useUserContext } from './userContext';
import { useModalContext } from './modalsContext';
import reducer from '../reducers/boardsReducer';
import axios from 'axios';

import {
  CREATE_BOARD_BEGIN,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
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
  GET_CURRENT_TASK,
  EDIT_SUBTASK,
  MOVE_TASK,
  DELETE_TASK_BEGIN,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
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
  activeBoardId: '',
  activeBoard: {},
  task: {},
  activeColumn: [],
};

const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
  const { token, user, logoutUser } = useUserContext();
  const { closeModals } = useModalContext();
  const [state, dispatch] = useReducer(reducer, initialState);
  const { activeBoardId, activeColumn, task } = state;

  const axiosInstance = axios.create({
    baseURL: '/api/v1/boards',
  });

  /* INCLUDE TOKEN ON HEADER FOR ALL REQUESTS */
  axiosInstance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        logoutUser();
      }
      return Promise.reject(error);
    }
  );

  /* GET ALL BOARDS */
  const getUserBoards = async () => {
    dispatch({ type: GET_USER_BOARD_BEGIN });
    try {
      const { data } = await axiosInstance.get(`/user-boards`);
      dispatch({ type: GET_USER_BOARD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: GET_USER_BOARD_ERROR });
    }
  };

  /* CREATE BOARD */
  const createBoard = async (values) => {
    dispatch({ type: CREATE_BOARD_BEGIN });

    try {
      const { data } = await axiosInstance.post(`/create-board`, values);
      dispatch({ type: CREATE_BOARD_SUCCESS, payload: data });
      closeModals();
    } catch (error) {
      dispatch({ type: CREATE_BOARD_ERROR });
    }
  };

  /* SET ACTIVE BOARD */
  const setActiveBoardId = async (id) => {
    try {
      const { data } = await axiosInstance.patch(`/active/board/${id}`, {
        isActive: true,
      });
      dispatch({ type: GET_USER_BOARD_COLUMN_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /* DELETE BOARD */
  const deleteBoard = async () => {
    dispatch({ type: DELETE_BOARD_BEGIN });
    try {
      const { data } = await axiosInstance.delete(`/board/${activeBoardId}`);
      dispatch({ type: DELETE_BOARD_SUCCESS, payload: data });
      closeModals();
    } catch (error) {
      dispatch({ type: DELETE_BOARD_ERROR });
    }
  };

  /* EDIT BOARD */
  const editBoard = async (values) => {
    dispatch({ type: EDIT_BOARD_BEGIN });
    try {
      const { data } = await axiosInstance.patch(
        `board/${activeBoardId}`,
        values
      );
      dispatch({ type: EDIT_BOARD_SUCCESS, payload: data });
      closeModals();
    } catch (error) {
      dispatch({ type: EDIT_BOARD_ERROR });
    }
  };

  /* CREATE TASK */
  const addNewTask = async (values) => {
    const { columnId } = values;

    dispatch({ type: CREATE_COLUMN_TASK_BEGIN });
    try {
      const { data } = await axiosInstance.post(
        `/board/${activeBoardId}/column/${columnId}`,
        values
      );
      dispatch({
        type: CREATE_COLUMN_TASK_SUCCESS,
        payload: data,
      });
      closeModals();
    } catch (error) {
      dispatch({ type: CREATE_COLUMN_TASK_ERROR });
    }
  };

  /* DELETE TASK */
  const deleteTask = async () => {
    dispatch({ type: DELETE_TASK_BEGIN });
    try {
      const { data } = await axiosInstance.delete(
        `/board/${activeBoardId}/column/${activeColumn._id}/task/${task._id}`
      );
      dispatch({ type: DELETE_TASK_SUCCESS, payload: data });
      closeModals();
    } catch (error) {
      dispatch({ type: DELETE_TASK_ERROR });
    }
  };

  /* EDIT TASK */
  const editTask = async (values) => {
    dispatch({ type: EDIT_TASK_BEGIN });
    try {
      const { data } = await axiosInstance.patch(
        `/board/${activeBoardId}/column/${activeColumn._id}/task/${task._id}`,
        values
      );
      dispatch({ type: EDIT_TASK_SUCCESS, payload: data });
      closeModals();
    } catch (error) {
      dispatch({ type: EDIT_TASK_ERROR });
    }
  };

  /* GET CURRENT TASK */
  const getCurrentTask = (task) => {
    dispatch({ type: GET_CURRENT_TASK, payload: task });
  };

  /* EDIT SUBTASKS */
  const editSubTaskCheckBox = async (subtaskId, columnId) => {
    try {
      const { data } = await axiosInstance.patch(
        `/board/${state.activeBoardId}/column/${columnId}/task/${state.task._id}/subtask/${subtaskId}`,
        {}
      );
      dispatch({ type: EDIT_SUBTASK, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /* MOVE TASK */
  const moveTasks = async (from, columnId) => {
    try {
      const { data } = await axiosInstance.patch(
        `/board/${activeBoardId}/column/${from}/task/${task._id}/move`,
        { activeTask: task, toId: columnId }
      );
      dispatch({ type: MOVE_TASK, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  /* DRAG AND DROP TASKS */
  const dndTask = async (values) => {
    dispatch({ type: DND_TASK_BEGIN });
    try {
      const { data } = await axiosInstance.patch(
        `/board/${activeBoardId}/tasks/dnd`,
        values
      );
      dispatch({ type: DND_TASK_SUCCESS, payload: data });
    } catch (error) {
      dispatch({ type: DND_TASK_ERROR });
    }
  };

  useEffect(() => {
    if (user && token) {
      getUserBoards();
    } else {
      logoutUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BoardContext.Provider
      value={{
        ...state,
        createBoard,
        getUserBoards,
        setActiveBoardId,
        deleteBoard,
        editBoard,
        addNewTask,
        getCurrentTask,
        editSubTaskCheckBox,
        moveTasks,
        deleteTask,
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
