const { userModel } = require('../schema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const getUsers = async () => {
  const users = await userModel.find({});

  return users;
};

const getUserById = async ({ userId }) => {
  const users = await userModel.findOne({ _id: userId });

  return users;
};

const createUser = async (body) => {
  const { password, email } = body;
  const saltRounds = 10;

  const hashPwd = await bcrypt.hash(password, saltRounds);

  const newUser = await userModel.create({ email, password: hashPwd }).catch((err) => {
    throw err;
  });

  return newUser;
};

const login = async (body) => {
  const { password, email } = body;

  const user = await userModel.findOne({ email }).lean().exec();
  if (!user) throw Error('No user found');

  const match = await bcrypt.compare(password, user.password);

  if (!match) throw Error(`Password missmatch`);

  const token = jwt.sign({ userId: user._id, email }, process.env.JWT_SECRET, { expiresIn: '2h' });

  user.token = token;

  return user;
};

const savePostId = async ({ postId, userId }) => {
  return userModel.findOneAndUpdate({ _id: userId }, { $push: { posts: postId } });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  savePostId,
};
