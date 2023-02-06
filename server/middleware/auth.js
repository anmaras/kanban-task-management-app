import { UnauthenticatedError } from '../errors/index.js';
import jwt from 'jsonwebtoken';

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  //check header
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
  //create token from header
  const token = authHeader.split(' ')[1];

  try {
    //verify token
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    //save user at req, controllers with auth middleware will have access to user id
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

export default auth;
