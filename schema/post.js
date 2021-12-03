const mongoose = require('mongoose');
const userModel = require('./user');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;
