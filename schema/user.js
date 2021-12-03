const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    required: [true, 'please enter an email'],
    unique: true,
    type: String,
  },
  password: {
    type: String,
    required: [true, 'please enter a password'],
    minlength: [3, 'Minimum 3 letters required'],
  },
  name: {
    type: String,
  },
  posts: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Post',
    },
  ],
});

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
