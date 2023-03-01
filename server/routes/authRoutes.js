import express from 'express';
const router = express.Router();
import {
  register,
  login,
  updateUser,
  deleteAccount,
} from '../controllers/authController.js';
import authenticatedUser from '../middleware/auth.js';

router.route('/register').post(register);
router.route('/login').post(login);
router.route('/updateUser').patch(authenticatedUser, updateUser);
router.route('/user/:userId').delete(authenticatedUser, deleteAccount);

export default router;
