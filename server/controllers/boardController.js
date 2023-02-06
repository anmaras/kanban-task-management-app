import Board from '../models/Boards.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

const createBoard = async (req, res) => {
  const { name, columns } = req.body;
  const columnsArray = columns.map((column) => ({ name: column }));

  const board = await Board.create({ name, columns: columnsArray });

  res.status(StatusCodes.CREATED).json({ boards: [board] });
};

export { createBoard };
