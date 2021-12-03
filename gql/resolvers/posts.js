const { postRest } = require('../../logics');

const resolvers = {
  Query: {
    getPosts: getPosts,
  },
  Post: {
    authorData: getAuthor,
  },
};

function getPosts(parent, args, context, info) {
  return postRest
    .getPost()
    .then((posts) => posts)
    .catch((err) => {
      throw err;
    });
}

function getAuthor(parent, args, { dataSources }, info) {
  console.log('Inside fetch author', { userId: parent.author });
  return dataSources.usersDataSource.Users.getUserById({ userId: parent.author })
    .then((posts) => posts)
    .catch((err) => {
      throw err;
    });
}

module.exports = resolvers;
