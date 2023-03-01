import User from '../models/Users.js';
import Board from '../models/Boards.js';

import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnauthenticatedError } from '../errors/index.js';

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
    throw new BadRequestError(
      JSON.stringify({ email: 'That email already exist ' })
    );
  }

  //create user
  const user = await User.create({
    name,
    email: email.toLowerCase(),
    password,
  });

  //create token/ method comes from user model check there.
  const token = user.createJWT();
  res
    .status(StatusCodes.CREATED)
    .json({ user: { name: user.name, email: user.email }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  //check if both values are valid
  if (!email || !password) {
    throw new BadRequestError('All values needed');
  }

  /* Because of the select:false property in model the password
  wont return in the document so with select('+password') i override it */
  const user = await User.findOne({ email }).select('+password');

  //if user doesn't exist throw custom error
  if (!user) {
    throw new UnauthenticatedError(
      JSON.stringify({ email: 'Cant find any user with that email' })
    );
  }
  //compare passwords, method is created at user model
  const isPasswordCorrect = await user.comparePassword(password);

  // if password not match throw custom error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError(
      JSON.stringify({ password: 'Invalid password' })
    );
  }

  //create token/ method comes from user model check there.
  const token = user.createJWT();

  //remove password from response
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const userExist = await User.findOne({ email });
  const user = await User.findOne({ _id: req.user.userId });

  if (!name || !email) {
    throw new BadRequestError('All values needed');
  }

  //if a user with the specific email input exist an this users email
  //is not the same with current logged user throw error so that logged
  //user cannot use that email
  if (userExist && userExist.email !== user.email) {
    throw new BadRequestError(
      JSON.stringify({ email: 'That email already exist ' })
    );
  }

  //add the new properties
  user.name = name;
  user.email = email;

  //save the user
  await user.save();

  //create new token to avoid messing with old data
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

const deleteAccount = async (req, res) => {
  const { userId } = req.params;

  await Board.deleteMany({ userId });
  await User.findOneAndDelete({ _id: userId });

  res.status(StatusCodes.OK).send('account deleted');
};

export { register, login, updateUser, deleteAccount };
