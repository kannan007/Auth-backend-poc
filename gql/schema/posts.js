const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    getPosts: [Post!]!
  }

  type Post {
    title: String!
    description: String
    author: String!
    authorData: AuthorData
  }

  type AuthorData {
    email: String!
  }
`;

module.exports = typeDefs;
