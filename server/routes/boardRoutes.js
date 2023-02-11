import express from 'express';
const router = express.Router();
import {
  createBoard,
  getAllBoards,
  getBoardColumns,
} from '../controllers/boardController.js';

router.route('/create-board').post(createBoard);
router.route('/get-user-boards').get(getAllBoards);
router.route('/get-user-boards/:id').get(getBoardColumns);

export default router;
