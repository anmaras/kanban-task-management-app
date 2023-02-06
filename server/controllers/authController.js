import User from '../models/Users.js';
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
    throw new BadRequestError('Ooops! that email already exist ');
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
    throw new UnauthenticatedError('Invalid email');
  }
  //compare passwords, method is created at user model
  const isPasswordCorrect = await user.comparePassword(password);

  // if password not match throw custom error
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError('Invalid Password');
  }

  //create token/ method comes from user model check there.
  const token = user.createJWT();

  //remove password from response
  user.password = undefined;

  res.status(StatusCodes.OK).json({ user, token });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError('All values needed');
  }
  //find user req.user.userId comes from middleware auth
  const user = await User.findOne({ _id: req.user.userId });

  //add the new properties
  user.name = name;
  user.email = email;

  //save the user
  await user.save();

  //create new token to avoid messing with old data
  const token = user.createJWT();

  res.status(StatusCodes.OK).json({ user, token });
};

export { register, login, updateUser };
