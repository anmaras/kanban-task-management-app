import React, { useContext, useReducer } from 'react';
import { useUserContext } from './userContext';
import reducer from '../reducers/boardsReducer';
import axios from 'axios';

import {
  CREATE_BOARD_BEGIN,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  SIDE_CREATE_MODAL_TOGGLE,
  CREATE_NEW_BOARD_MODAL_TOGGLE,
  CLOSE_MODAL,
  GET_USER_BOARD_BEGIN,
  GET_USER_BOARD_SUCCESS,
  GET_USER_BOARD_ERROR,
  GET_USER_BOARD_COLUMN_SUCCESS,
} from '../utils/actions';

export const initialState = {
  isLoading: false,
  boards: [],
  totalBoards: 0,
  createBoardVisible: false,
  sideBoardModalVisible: false,
  activeBoardId: '',
  activeBoard: {},
};

const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { token } = useUserContext();

  const handleCreateBoardModal = () => {
    dispatch({ type: CREATE_NEW_BOARD_MODAL_TOGGLE });
  };

  const handleSideBoardModal = () => {
    dispatch({ type: SIDE_CREATE_MODAL_TOGGLE });
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
      getUserBoards();
    } catch (error) {
      dispatch({ type: CREATE_BOARD_ERROR });
      console.log(error);
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
      console.log(error);
    }
  };

  const getBoardColumns = async (activeBoardId) => {
    dispatch({ type: GET_USER_BOARD_COLUMN_SUCCESS, payload: activeBoardId });
  };

  return (
    <BoardContext.Provider
      value={{
        ...state,
        createBoard,
        handleCreateBoardModal,
        handleSideBoardModal,
        closeModal,
        getUserBoards,
        getBoardColumns,
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
