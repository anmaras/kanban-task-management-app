import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

//CREATE BOARD
const createBoard = async (req, res) => {
  const { name, columns } = req.body;

  //check if values exist
  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  //the newest board is set to active and the rest to false
  await Board.updateMany({ isActive: true }, { $set: { isActive: false } });

  // create the main board
  const board = await Board.create({
    name,
    columns,
    userId: req.user.userId,
    isActive: true,
  });

  res.status(StatusCodes.CREATED).json(board);
};

//GET ALL USER BOARDS
const getAllBoards = async (req, res) => {
  //Find the specific user boards
  const boards = await Board.find({ userId: req.user.userId });

  const activeBoard = boards.find((board) => board.isActive === true);

  //return the boards, the amount and the selected created board is the active board Id
  res.status(StatusCodes.OK).json({
    boards,
    totalBoards: boards.length,
    activeBoardId: boards.length > 0 ? activeBoard._id : '',
  });
};

//DELETE BOARD
const deleteBoard = async (req, res) => {
  const { id } = req.params;

  //find current next and previous boards
  const board = await Board.findOne({ _id: id });
  const nextBoard = await Board.findOne({ _id: { $gt: id } });
  const previousBoard = await Board.findOne({ _id: { $lt: id } }).sort({
    _id: -1,
  });

  if (!board) {
    throw new NotFoundError(`No board with id${id}`);
  }
  //delete selected board

  await board.remove();

  //when current board is deleted check if there is one after to set it active.
  //if there is not a next one set active the previous one.
  if (nextBoard) {
    nextBoard.isActive = true;
    await nextBoard.save();
  } else if (previousBoard) {
    previousBoard.isActive = true;
    await previousBoard.save();
  }

  res.status(StatusCodes.OK).send({ board, nextBoard, previousBoard });
};

//UPDATE BOARD AND COLUMNS NAMES
const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { name, columns } = req.body;

  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  //Find the selected board
  const board = await Board.findOne({ _id: id });

  //if board doesn't exist throw error
  if (!board) {
    throw new NotFoundError(`No board with id ${id}`);
  }

  const updatedBoard = await Board.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updatedBoard);
};

const selectActive = async (req, res) => {
  const { id } = req.params;

  //set all todos to is active false
  await Board.updateMany({ isActive: true }, { $set: { isActive: false } });

  //update the current todo to isActive true
  const updatedBoard = await Board.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updatedBoard);
};

const createBoardTask = async (req, res) => {
  const { id, columnId } = req.params;
  const { title, description, status, subtasks } = req.body;

  //find the board
  const board = await Board.findOne({ _id: id });

  //check if board exist
  if (!board) {
    throw new NotFoundError(`No board with id ${id}`);
  }

  //find the column
  const column = board.columns.find(
    (column) => column._id.toString() === columnId
  );
  //check if column exist
  if (!column) {
    throw new NotFoundError(`No column with id ${id}`);
  }

  //create task
  const task = {
    title,
    description,
    status,
    subtasks,
  };

  //put the task in the column
  column.tasks.push(task);

  //save the board
  await board.save();

  res.status(StatusCodes.CREATED).json(board);
};

const editSubtask = async (req, res) => {
  const { boardId, columnId, taskId, subId } = req.params;

  const board = await Board.findOne({ _id: boardId });

  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  const column = board.columns.find((col) => col._id.toString() === columnId);
  const task = column.tasks.find((task) => task._id.toString() === taskId);
  const subtask = task.subtasks.find((sub) => sub._id.toString() === subId);

  subtask.isCompleted = !subtask.isCompleted;

  await board.save();

  res.status(StatusCodes.OK).json({ task, board });
};

//MOVE TASKS
const moveTask = async (req, res) => {
  const { boardId, fromId, taskId } = req.params;
  const { toId, activeTask } = req.body;

  if (fromId === toId) {
    return;
  }

  //find board
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    throw new NotFoundError(`No board with id ${boardId}`);
  }

  //find the column that the task will move out
  const fromColumn = board.columns.find((col) => col._id.toString() === fromId);
  if (!fromColumn) {
    throw new NotFoundError(`No column with id ${boardId}`);
  }

  //find the task index
  const taskIndex = fromColumn.tasks.findIndex(
    (task) => task._id.toString() == taskId
  );

  if (taskIndex < 0) {
    throw new NotFoundError(`No task with that index`);
  }

  //remove the task from the fromColumn
  fromColumn.tasks.splice(taskIndex, 1)[0];

  //find the toColumn that the task will go
  const toColumn = board.columns.find(
    (column) => column._id.toString() === toId
  );

  //create different task id at the moved column
  // toColumn.tasks = [task, ...toColumn.tasks];

  //keep the same task id and push it to toColumn
  //--- might change that push the spliced task throw error for the moment
  toColumn.tasks.push(activeTask);

  await board.save();

  res.status(StatusCodes.OK).json(board);
};

export {
  createBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
  selectActive,
  createBoardTask,
  editSubtask,
  moveTask,
};
