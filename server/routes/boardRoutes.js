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
  dndTask,
} from '../controllers/boardController.js';

router.route('/user-boards').get(getAllBoards);
router.route('/create-board').post(createBoard);
router.route('/active/board/:id').patch(selectActive);
router.route('/board/:id').delete(deleteBoard).patch(updateBoard);
router.route('/board/:id/column/:columnId').post(createBoardTask);

router
  .route('/board/:boardId/column/:columnId/task/:taskId/subtask/:subId')
  .patch(editSubtask);
router
  .route('/board/:boardId/column/:fromId/task/:taskId/move')
  .patch(moveTask);

router
  .route('/board/:boardId/column/:columnId/task/:taskId')
  .delete(deleteTask)
  .patch(editTask);

router.route('/board/:boardId/tasks/dnd').patch(dndTask);

export default router;
