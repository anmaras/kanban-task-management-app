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

  const board = await Board.findByIdAndDelete({ _id: id });

  const nextBoard = await Board.findOne({ _id: { $gt: id } });

  if (nextBoard) {
    nextBoard.isActive = true;
  }

  if (!board) {
    throw new NotFoundError(`No board with id${id}`);
  }
  res.status(StatusCodes.OK).send('Board Deleted');
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

export { createBoard, getAllBoards, deleteBoard, updateBoard, selectActive };
