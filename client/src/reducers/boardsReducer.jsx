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

const boardReducer = (state, action) => {
  if (action.type === SIDE_CREATE_MODAL_TOGGLE) {
    return { ...state, sideBoardModalVisible: !state.sideBoardModalVisible };
  }

  if (action.type === CREATE_NEW_BOARD_MODAL_TOGGLE) {
    return {
      ...state,
      sideBoardModalVisible: false,
      createBoardVisible: !state.createBoardVisible,
    };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      createBoardVisible: false,
      sideBoardModalVisible: false,
    };
  }

  if (action.type === CREATE_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_BOARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      createBoardVisible: false,
    };
  }

  if (action.type === CREATE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  if (action.type === GET_USER_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_USER_BOARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      boards: action.payload,
      activeBoardId: action.payload.activeBoardId,
    };
  }

  if (action.type === GET_USER_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  if (action.type === GET_USER_BOARD_COLUMN_SUCCESS) {
    const activeBoard = state.boards.boards.find(
      (board) => board._id === action.payload
    );

    return {
      ...state,
      activeBoardId: action.payload,
      activeBoard,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default boardReducer;
