const { userRest, postRest } = require('../../logics');

const resolvers = {
  Query: {
    getUsers: getUsers,
  },
  User: {
    posts: getPosts,
  },
};

function getUsers(parent, args, { dataSources }, info) {
  return dataSources.usersDataSource.Users.getUsers()
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
}

function getPosts(parent, args, { dataSources }, info) {
  return dataSources.postsDataSource.Posts.getPostById({ userId: parent._id })
    .then((data) => data)
    .catch((err) => {
      throw new Error(err);
    });
}

module.exports = resolvers;
