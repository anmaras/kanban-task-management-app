import React, { useContext, useReducer } from 'react';
import reducer from '../reducers/boardsReducer';
import axios from 'axios';

import {
  CREATE_BOARD_BEGIN,
  CREATE_BOARD_SUCCESS,
  CREATE_BOARD_ERROR,
  SIDE_CREATE_MODAL_TOGGLE,
  CLOSE_MODAL,
} from '../utils/actions';

export const initialState = {
  isLoading: false,
  boards: [],
  createBoardVisible: false,
  sideBoardModalVisible: false,
};

const BoardContext = React.createContext();

export const BoardProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCreateBoardModal = () => {
    console.log('toggle create board modal');
  };

  const handleSideBoardModal = () => {
    dispatch({ type: SIDE_CREATE_MODAL_TOGGLE });
  };

  const closeModal = () => {
    dispatch({ type: CLOSE_MODAL });
  };

  const createBoard = async () => {
    // dispatch({ type: CREATE_BOARD_BEGIN });
    console.log('create board');
    // try {
    //   // const response = await axios.post('/api/v1/auth/boards/create-board');
    // } catch (error) {}
  };

  return (
    <BoardContext.Provider
      value={{
        ...state,
        createBoard,
        handleCreateBoardModal,
        handleSideBoardModal,
        closeModal,
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
