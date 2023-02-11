import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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

  // const board = await Board.create({
  //   activeBoard: name,
  //   boards: [{ name, columns: columnsArray, userId: req.user.userId }],
  // });

  res.status(StatusCodes.CREATED).json(board);
};

const getAllBoards = async (req, res) => {
  const boards = await Board.find({ userId: req.user.userId });

  res.status(StatusCodes.OK).json({
    boards,
    totalBoards: boards.length,
    activeBoardId: boards[boards.length - 1]._id,
  });
};

const getBoardColumns = async (req, res) => {
  const { id } = req.params;

  const board = await Board.findOne({ _id: id });

  res.status(StatusCodes.OK).json({
    board,
  });
};

export { createBoard, getAllBoards, getBoardColumns };
