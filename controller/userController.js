const Joi = require("@hapi/joi");
const User = require("../models/userModel");

exports.createNewUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json({
      status: "Success",
      user: newUser,
    });
  } catch ({ errmsg }) {
    res.status(400).json({
      status: "Failure",
      errmsg,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "Success",
      users,
    });
  } catch ({ errmsg }) {
    res.status(4000).json({
      status: "Failure",
      errmsg,
    });
  }
};

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
  console.log(req.body);
  next();
};
