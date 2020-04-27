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

// Middlewars
app.use(helmet());
app.use(express.json());
app.use(compression());


// Data sanitization against NoSql query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// Routes
app.use("/api", userRouter);

// handle unimplemented routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrorHandler);

// Error middleware

module.exports = app;
