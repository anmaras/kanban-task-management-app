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
  DELETE_TASK_MODAL_TOGGLE,
  DELETE_TASK_BEGIN,
  DELETE_TASK_SUCCESS,
  DELETE_TASK_ERROR,
  UPDATE_TASK_MODAL_TOGGLE,
  EDIT_TASK_BEGIN,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
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

  if (action.type === DELETE_TASK_MODAL_TOGGLE) {
    return { ...state, deleteTaskModalVisible: !state.deleteTaskModalVisible };
  }

  if (action.type === UPDATE_TASK_MODAL_TOGGLE) {
    return { ...state, updateTaskModalVisible: !state.updateTaskModalVisible };
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
      deleteTaskModalVisible: false,
      updateTaskModalVisible: false,
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
      activeColumn: action.payload.columns[0],
    };
  }

  if (action.type === CREATE_BOARD_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET USERS BOARDS */
  if (action.type === GET_USER_BOARD_BEGIN) {
    return { ...state, fetchDataLoading: true };
  }

  if (action.type === GET_USER_BOARD_SUCCESS) {
    const activeBoard = action.payload.boards.find((board) => board.isActive);
    return {
      ...state,
      fetchDataLoading: false,
      boards: action.payload.boards,
      activeBoardId: activeBoard?._id,
      activeBoard,
      activeColumn: activeBoard?.columns[0],
    };
  }

  if (action.type === GET_USER_BOARD_ERROR) {
    return { ...state, fetchDataLoading: false };
  }

  /* GET ACTIVE BOARD */

  if (action.type === GET_USER_BOARD_COLUMN_SUCCESS) {
    return {
      ...state,
      activeBoardId: action.payload?._id,
      activeBoard: action.payload,
      activeColumn: action.payload.columns[0],
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
      activeColumn:
        action.payload.nextBoard?.columns[0] ||
        action.payload.previousBoard?.columns[0],
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
      activeColumn: action.payload.columns[0],
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
      activeColumn: action.payload.columns[0],
    };
  }
  if (action.type === CREATE_COLUMN_TASK_ERROR) {
    return { ...state, isLoading: false };
  }

  /* GET CURRENT TASK */

  if (action.type === GET_CURRENT_TASK) {
    const activeColumn = state.activeBoard.columns
      .filter((col) => col.tasks.includes(action.payload))
      .pop();

    return { ...state, task: action.payload, activeColumn, isLoading: false };
  }

  /* EDIT SUBTASK */

  if (action.type === EDIT_SUBTASK) {
    return {
      ...state,
      task: action.payload.task,
      activeBoard: action.payload.board,
      activeBoardId: action.payload.board._id,
      isLoading: false,
    };
  }

  /* MOVE TASK */

  if (action.type === MOVE_TASK) {
    const editedBoard = action.payload.board;
    const boards = state.boards;
    const editedBoards = boards.map((board) => {
      if (board._id === editedBoard._id) {
        return (board = editedBoard);
      }
      return board;
    });

    return {
      ...state,
      boards: editedBoards,
      activeBoard: editedBoard,
      isLoading: false,
      activeColumn: action.payload.toColumn,
    };
  }

  /* DELETE TASK */
  if (action.type === DELETE_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === DELETE_TASK_SUCCESS) {
    const editedBoards = state.boards.map((oldBoard) => {
      if (oldBoard._id === action.payload._id) {
        return (oldBoard = action.payload);
      }
      return oldBoard;
    });

    return {
      ...state,
      isLoading: false,
      activeBoard: action.payload,
      boards: editedBoards,
    };
  }

  if (action.type === DELETE_TASK_ERROR) {
    return { ...state, isLoading: false };
  }

  /* EDIT TASK */
  if (action.type === EDIT_TASK_BEGIN) {
    return { ...state, isLoading: true };
  }

  if (action.type === EDIT_TASK_SUCCESS) {
    const editedBoards = state.boards.map((oldBoard) => {
      if (oldBoard._id === action.payload._id) {
        return (oldBoard = action.payload);
      }
      return oldBoard;
    });

    return {
      ...state,
      isLoading: false,
      ...state,
      activeBoard: action.payload,
      boards: editedBoards,
    };
  }
  if (action.type === EDIT_TASK_ERROR) {
    return { ...state, isLoading: false };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default boardReducer;
