const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  create_time: {
    type: Date,
    default: Date.now(),
  },
  status: {
    type: Boolean,
    default: true,
    trim: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
