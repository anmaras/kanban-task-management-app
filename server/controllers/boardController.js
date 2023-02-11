import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
} from '../errors/index.js';

const createBoard = async (req, res) => {
  const { name, columns } = req.body;
  const columnsArray = columns.map((column) => ({ name: column.name }));

  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  const board = await Board.create({
    name,
    columns: columnsArray,
    userId: req.user.userId,
  });
  res.status(StatusCodes.CREATED).json(board);
};

const getAllBoards = async (req, res) => {
  const boards = await Board.find({ userId: req.user.userId });

  res.status(StatusCodes.OK).json({
    boards,
    totalBoards: boards.length,
    activeBoardId: boards.length > 0 ? boards[boards.length - 1]._id : '',
  });
};

const deleteBoard = async (req, res) => {
  const { id } = req.params;

  const board = await Board.findByIdAndDelete({ _id: id });

  if (!board) {
    throw new NotFoundError(`No board with id${id}`);
  }
  res.status(StatusCodes.OK).send('Board Deleted');
};

const updateBoard = async (req, res) => {
  const { id } = req.params;
  const { name, columns } = req.body;

  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  const board = await Board.findOne({ _id: id });
  // const boards = await Board.find({ userId: req.user.userId });

  // boards.map((board) => {
  //   if (board._id !== id) {
  //     board.isActive = false;
  //   }
  //   board.isActive = true;

  //   return board;
  // });

  // console.log(boards);

  if (!board) {
    throw new NotFoundError(`No board with id ${id}`);
  }

  const updatedBoard = await Board.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(updatedBoard);
};

export { createBoard, getAllBoards, deleteBoard, updateBoard };
