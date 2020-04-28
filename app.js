const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const userRouter = require("./routes/userRoutes");

const app = express();

// Dev Middlewars
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Middlewars
app.use(helmet());
app.use(express.json());
app.use(compression());
app.use(mongoSanitize()); // Data sanitization against NoSql query injection
app.use(xss()); // Data sanitization against XSS

// Implemented Routes
app.use("/api", userRouter);

// Unimplemented routs
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrorHandler); // Global error handler

module.exports = app;
