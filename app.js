const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");

const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewars
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api", userRouter);

// handle unimplemented routes
app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 400));
});

app.use(globalErrorHandler);

// Error middleware

module.exports = app;
