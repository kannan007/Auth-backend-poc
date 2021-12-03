const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getUsers: [User!]!
  }

  type User {
    email: String!
    posts: [Post]
  }

  type Post {
    title: String
  }
`;

module.exports = typeDefs;
