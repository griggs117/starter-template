import { gql } from "apollo-boost";

// User Queries
export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      id
      username
      date
      email
    }
  }
`;

// User Mutations
export const SIGNUP_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $password2: String!
  ) {
    signupUser(
      username: $username
      email: $email
      password: $password
      password2: $password2
    ) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation($id: String!) {
    deleteUser(id: $id) {
      username
    }
  }
`;
