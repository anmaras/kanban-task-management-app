import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const createBoard = async (req, res) => {
  const { name, columns } = req.body;
  const columnsArray = columns.map((column) => ({ name: column }));

  if (!name || !columns) {
    throw new BadRequestError('Please provide all values');
  }

  const board = await Board.create({
    name,
    columns: columnsArray,
    userId: req.user.userId,
  });

  res.status(StatusCodes.CREATED).json({ boards: [board] });
};

const getAllBoards = async (req, res) => {
  res.send('get all boards');
};

export { createBoard, getAllBoards };
