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
  EDIT_BOARD_MODAL_TOGGLE,
} from '../utils/actions';

const boardReducer = (state, action) => {
  /* MODALS */

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

  if (action.type === EDIT_BOARD_MODAL_TOGGLE) {
    return { ...state, editBoardVisible: !state.editBoardVisible };
  }

  if (action.type === DELETE_MODAL_TOGGLE) {
    return { ...state, deleteModalVisible: !state.deleteModalVisible };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      createBoardVisible: false,
      sideBoardModalVisible: false,
      deleteModalVisible: false,
      editBoardVisible: false,
    };
  }

  /* CRUD BOARDS */

  /* CREATE */
  if (action.type === CREATE_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_BOARD_SUCCESS) {
    return {
      ...state,
      isLoading: false,
    };
  }

  if (action.type === CREATE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET */
  if (action.type === GET_USER_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_USER_BOARD_SUCCESS) {
    const activeBoard = action.payload.boards.find(
      (board) => board._id === action.payload.activeBoardId
    );

    return {
      ...state,
      isLoading: false,
      boards: action.payload,
      activeBoardId: action.payload.activeBoardId,
      activeBoard,
    };
  }

  if (action.type === GET_USER_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET ACTIVE BOARD */

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

  /* DELETE BOARD */

  if (action.type === DELETE_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_BOARD_SUCCESS) {
    return { ...state, isLoading: false };
  }

  if (action.type === DELETE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* EDIT BOARD */

  if (action.type === EDIT_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_BOARD_SUCCESS) {
    return { ...state, isLoading: false };
  }

  if (action.type === EDIT_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default boardReducer;
