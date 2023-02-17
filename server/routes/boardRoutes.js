import express from 'express';
const router = express.Router();
import {
  createBoard,
  getAllBoards,
  deleteBoard,
  updateBoard,
  selectActive,
  createBoardTask,
  editSubtask,
  moveTask,
  deleteTask,
  editTask,
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
router
  .route('/board/:boardId/column/:columnId/task/:taskId/subtask/:subId')
  .patch(editSubtask);
router
  .route('/board/:boardId/column/:fromId/task/:taskId/move')
  .patch(moveTask);
router
  .route('/board/:boardId/column/:columnId/task/:taskId/delete')
  .delete(deleteTask);
router
  .route('/board/:boardId/column/:columnId/task/:taskId/edit')
  .patch(editTask);

export default router;
