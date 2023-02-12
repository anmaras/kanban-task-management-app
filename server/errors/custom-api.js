/* Class extend from Error so to create custom errors 
that extend from Js Error obj */
class CustomApiError extends Error {
  constructor(message) {
    super(message);
  }
}

export default CustomApiError;
