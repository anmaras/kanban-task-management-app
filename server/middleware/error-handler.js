import { StatusCodes } from 'http-status-codes';

const errorHandlerMiddleware = (err, req, res, next) => {
  console.log(err);
  const defaultError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    //err.message comes from throw at authController
    msg: err.message || 'Something went wrong, try again later',
  };

  //check for user validation errors
  if (err.name === 'ValidationError') {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;

    defaultError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(',');
  }

  //error condition to check if email exist
  if (err.code && err.code === 11000) {
    defaultError.statusCode = StatusCodes.BAD_REQUEST;
    defaultError.msg = `A user with that ${Object.keys(
      err.keyValue
    )} already exist`;
  }

  res.status(defaultError.statusCode).json({ msg: defaultError.msg });
};

export default errorHandlerMiddleware;
