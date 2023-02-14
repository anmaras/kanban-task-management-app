import express from 'express';
const router = express.Router();
import {
  createBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
  selectActive,
  createBoardTask,
} from '../controllers/boardController.js';

router.route('/create-board').post(createBoard);
router.route('/get-user-boards').get(getAllBoards);
router
  .route('/get-user-boards/board/:id')
  .delete(deleteBoard)
  .patch(updateBoard);
router
  .route('/get-user-boards/board/:id/column/:columnId')
  .post(createBoardTask);

router.route('/get-user-boards/active/board/:id').patch(selectActive);

export default router;
