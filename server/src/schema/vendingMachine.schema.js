import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    vendingMachines(page: Int, limit: Int): VendingMachinePagination!
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

  type VendingMachinePagination {
    count: Int!
    page: Int!
    limit: Int!
    rows: [VendingMachine]
  }
`;
