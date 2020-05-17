const moongose = require('mongoose');

const dealSchema = new moongose.Schema({
  firstName: {
    type: String,
    required: [true, 'first name cannot be empty'],
  },
  lastName: {
    type: String,
    required: [true, 'Last Name cannot be empty'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: [true, 'Email is requierd'],
  },
});

const Deal = moongose.model('Deal', dealSchema);

module.exports = Deal;
