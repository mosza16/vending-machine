import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    vendingMachines: [VendingMachine!]
  }

  type VendingMachine {
    machineId: ID!
    machineCode: String!
    locationId: String!
    statusCode: String!
    createdAt: Date
    createdBy: String
    updatedAt: Date
    updatedBy: String
  }
`;
