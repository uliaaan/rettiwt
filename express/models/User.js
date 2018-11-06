const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  login: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    select: false,
    required: true
  },
  following: {
    type: Array
  },
  followers: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model('users', UserSchema);
