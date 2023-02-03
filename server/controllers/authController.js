import User from '../models/Users.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

const register = async (req, res) => {
  const { name, email, password } = req.body;
  //if user don't type any values throw error
  if (!name || !email || !password) {
    throw new BadRequestError('All values needed');
  }

  //check if email exist in DB
  const userExist = await User.findOne({ email });
  //if email exist then throw the error
  if (userExist) {
    throw new BadRequestError('User already exist');
  }

  //create user
  const user = await User.create({ name, email, password });

  //create token/ method comes from user model check there.
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  res.send('login user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

export { register, login, updateUser };
