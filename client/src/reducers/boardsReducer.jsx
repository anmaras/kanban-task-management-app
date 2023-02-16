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

  if (action.type === ADD_COLUMN_MODAL_TOGGLE) {
    return { ...state, addColumnModalVisible: !state.addColumnModalVisible };
  }

  if (action.type === ADD_TASK_MODAL_TOGGLE) {
    return { ...state, addTaskModalVisible: !state.addTaskModalVisible };
  }

  if (action.type === VIEW_TASK_MODAL_TOGGLE) {
    return { ...state, viewTaskModalVisible: !state.viewTaskModalVisible };
  }

  if (action.type === CLOSE_MODAL) {
    return {
      ...state,
      createBoardVisible: false,
      sideBoardModalVisible: false,
      deleteModalVisible: false,
      editBoardVisible: false,
      addColumnModalVisible: false,
      addTaskModalVisible: false,
      viewTaskModalVisible: false,
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
      boards: [...state.boards, action.payload],
      activeBoardId: action.payload._id,
      activeBoard: action.payload,
    };
  }

  if (action.type === CREATE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET USERS BOARDS */
  if (action.type === GET_USER_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === GET_USER_BOARD_SUCCESS) {
    const activeBoard = action.payload.boards.find((board) => board.isActive);

    return {
      ...state,
      isLoading: false,
      boards: action.payload.boards,
      activeBoardId: activeBoard?._id,
      activeBoard,
    };
  }

  if (action.type === GET_USER_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET ACTIVE BOARD */

  if (action.type === GET_USER_BOARD_COLUMN_SUCCESS) {
    return {
      ...state,
      activeBoardId: action.payload?._id,
      activeBoard: action.payload,
    };
  }

  /* DELETE BOARD */

  if (action.type === DELETE_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_BOARD_SUCCESS) {
    const boardItem = action.payload.board;

    const boardsList = state.boards;

    const newBoardList = boardsList.filter(
      (board) => board._id !== boardItem._id
    );

    return {
      ...state,
      isLoading: false,
      boards: newBoardList,
      activeBoard: action.payload.nextBoard || action.payload.previousBoard,
      activeBoardId:
        action.payload.nextBoard?._id || action.payload.previousBoard?._id,
    };
  }

  if (action.type === DELETE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* EDIT BOARD */

  if (action.type === EDIT_BOARD_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_BOARD_SUCCESS) {
    const { columns, isActive, name, _id } = action.payload;

    const tempBoardArray = state.boards.map((board) => {
      if (board._id === _id) {
        board.name = name;
        board.columns = columns;
        board.isActive = isActive;

        return board;
      }
      return board;
    });

    return {
      ...state,
      isLoading: false,
      boards: tempBoardArray,
      activeBoardId: action.payload._id,
      activeBoard: action.payload,
    };
  }

  if (action.type === EDIT_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* CREATE NEW TASK */
  if (action.type === CREATE_COLUMN_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === CREATE_COLUMN_TASK_SUCCESS) {
    const { _id, columns } = action.payload;

    const tempBoardArray = state.boards.map((board) => {
      if (board._id === _id) {
        board.columns = columns;
        return board;
      }
      return board;
    });

    return {
      ...state,
      isLoading: false,
      boards: tempBoardArray,
      activeBoardId: action.payload._id,
      activeBoard: action.payload,
    };
  }
  if (action.type === CREATE_COLUMN_TASK_ERROR) {
    return { ...state, isLoading: false };
  }

  if (action.type === GET_CURRENT_TASK) {
    return { ...state, task: action.payload };
  }

  if (action.type === EDIT_SUBTASK) {
    return {
      ...state,
      task: action.payload.task,
      activeBoard: action.payload.board,
      activeBoardId: action.payload.board._id,
    };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default boardReducer;
