const AppError = require("../utils/appError");

// Handle errors on development
const sendDevError = (err, res) => {
  res.status(err.statusCode).json({
    // In development we want full logs
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Handle errors on production
const sendProdError = (err, res) => {
  // Operational , trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    // Unknown error: we don't want to leak error details (not operational)
  } else {
    // 1) log error
    console.error("ERROR ", err);

    //2) send generic message
    res.status(500).json({
      status: "error",
      message: "Something went wrong...",
    });
  }
};

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]; // https://stackoverflow.com/questions/171480/regex-grabbing-values-between-quotation-marks
  const message = `Duplicate field value ${value}`;

  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleRouteError = (err) => {
  const errmsg = err.message;
  return new AppError(errmsg, 404);
};

// By specifying 4 args(err,req , res , next) express allready knows thi is a global error middleware.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendDevError(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err); // create a hard copy of the error , read about enumerable properties of an object

    // This are mongoDB errors , so we will mark each of these errors as operational

    // Duplicate field error.code === 11000
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    } else if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendProdError(error, res);
  }
};
