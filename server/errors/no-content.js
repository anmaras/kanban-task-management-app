import CustomApiError from './custom-api.js';
import { StatusCodes } from 'http-status-codes';

class NoContent extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.OK;
  }
}

export default NoContent;
