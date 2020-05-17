const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: [true, "Please tell us your name"],
    trim: true,
  },
  username: {
    type: String,
    required: [true, "Please Provide your username"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: [8, "Password should be 8 char long "],
  },
  create_time: {
    type: Date,
    default: Date.now(),
  },
});

// Hash the user password
userSchema.pre("save", async function (next) {
  // mongoose middleware pre hook
  this.password = await bcrypt.hash(this.password, 12); // salt and hash the password
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
