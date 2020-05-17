const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const compression = require('compression');
const cors = require('cors');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controller/errorController');
const userRouter = require('./routes/userRoutes');
const dealsRouter = require('./routes/dealRoutes');

const app = express();
app.use(cors());
// Dev Middlewars
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Middlewars
app.use(helmet()); // Set security HTTP headers
app.use(express.json());
app.use(compression()); // compress the res
app.use(mongoSanitize()); // Data sanitization against NoSql query injection -> filter mongoDB objects
app.use(xss()); // Data sanitization against XSS -> convert all html symbols

// Implemented Routes
app.use('/api', userRouter);
app.use('/api/deals', dealsRouter);

// Unimplemented routs
app.all('*', (req, res, next) => {
  // if the next function recive an argument express will allready assume that it is an error
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

// By specifying 4 args(err,req , res , next) express allready knows this is a global error middleware.
app.use(globalErrorHandler); // Global error handler , we dont have an error resource , but we need to define some erro handlers which are also controllers

module.exports = app;
