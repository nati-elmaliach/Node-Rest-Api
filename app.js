const express = require("express");
const morgan = require("morgan");
const userRouter = require("./routes/userRoutes");

const app = express();

// Middlewars

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));


app.use(express.json());
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use("/api", userRouter);

module.exports = app;
