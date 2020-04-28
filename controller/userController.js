const Joi = require("@hapi/joi");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const setStatusValue = require("../utils/userUtils");

exports.createNewUser = catchAsync(async (req, res, next) => {
  const newUser = await User.create({ ...req.body, create_time: Date.now() });
  res.status(200).json({
    status: "Success",
    user: newUser,
  });
});

// TODO change the status on the client
exports.getAllUsers = catchAsync(async (req, res, next) => {
  let users = await User.find().select("-password"); //  exclude user password from response
  users = setStatusValue(users);
  res.status(200).json({
    status: "Success",
    users,
  });
});

// TODO move the validation to mongoose
exports.validateData = (req, res, next) => {
  const schema = Joi.object({
    nickname: Joi.string().max(11).required(),
    username: Joi.string().max(50).required(),
    password: Joi.string().max(200).required(),
  });

  const { error } = schema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(404).send(error.details.map((e) => e.message));
  }
  next();
};
