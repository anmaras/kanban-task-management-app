import express from 'express';
const router = express.Router();
import {
  createBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
  selectActive,
} from '../controllers/boardController.js';

router.route('/create-board').post(createBoard);
router.route('/get-user-boards').get(getAllBoards);
router.route('/get-user-boards/:id').delete(deleteBoard).patch(updateBoard);
router.route('/get-user-boards/active/:id').patch(selectActive);

export default router;
