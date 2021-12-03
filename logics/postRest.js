const { postModel } = require('../schema');

const getPost = () => {
  return postModel.find({});
};

const getPostById = ({ userId }) => {
  return postModel.find({ author: userId });
};

const createPost = (body, locals) => {
  const { title, description } = body;

  const { userId } = locals;

  return postModel.create({ title, description, author: userId });
};

module.exports = {
  getPost,
  createPost,
  getPostById,
};
