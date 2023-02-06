import express from 'express';
const router = express.Router();
import { createBoard } from '../controllers/boardController.js';

router.route('/').post(createBoard);

export default router;
