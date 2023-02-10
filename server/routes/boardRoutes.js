import express from 'express';
const router = express.Router();
import { createBoard, getAllBoards } from '../controllers/boardController.js';

router.route('/create-board').post(createBoard);

export default router;
