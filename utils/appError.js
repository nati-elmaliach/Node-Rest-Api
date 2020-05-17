// AppError inheriates from thebuilt in Error class
class AppError extends Error {
  constructor(message, statusCode) {
    super(message); // call the parent contructor , message is the  only parameter error except

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "Failure" : "Error"; // 4* -> failure , else internal server error
    this.isOperational = true; // mark this error as operational ,all the errors that we throw depend on the user or the server

    Error.captureStackTrace(this, this.constructor); //  Omit the error generated from calling this constructor
    // https://nodejs.org/api/errors.html#errors_error_capturestacktrace_targetobject_constructoropt
  }
}

module.exports = AppError;
