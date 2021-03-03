import { gql } from 'apollo-server-express';
import { GeneralFields } from './general.schema';

export default gql`
  extend type Query {
    vendingMachines(page: Int, limit: Int): VendingMachinePagination!
    vendingMachine(machineId: ID!): VendingMachine
  }

  type VendingMachine {
    machineId: ID!
    machineCode: String!
    locationId: String!
    statusCode: String!
    products(page: Int, limit: Int, search: SearchVendingMachineProductInput): MachineProductPagination
    ${GeneralFields}
  }

  type VendingMachinePagination {
    count: Int!
    page: Int!
    limit: Int!
    rows: [VendingMachine]
  }

  type MachineProduct{
    quantity: Int!
    product: Product
    ${GeneralFields}
  }

  type MachineProductPagination {
    count: Int!
    page: Int!
    limit: Int!
    rows: [MachineProduct]
  }

  input SearchVendingMachineProductInput {
    categories: [String!]
  }
`;
