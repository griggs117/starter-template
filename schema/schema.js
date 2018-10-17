const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    date: String
  }

  type Token {
    token: String!
  }

  type Query {
    getCurrentUser: User
    getAllUsers: [User]
  }

  type Mutation {
    signinUser(email: String!, password: String!): Token
    signupUser(
      username: String!
      email: String!
      password: String!
      password2: String!
    ): Token
    deleteUser(id: String!): User
  }
`;
