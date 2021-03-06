import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    checkAuthenticated: String
  }

  extend type Mutation {
    createAdminUser(user: CreateAdminUserInput!): String
    login(username: String!, password: String!): Login
  }

  type Login {
    session: String!
    userId: String!
  }

  input CreateAdminUserInput {
    email: String!
    phone: String!
    password: String!
  }
`;
