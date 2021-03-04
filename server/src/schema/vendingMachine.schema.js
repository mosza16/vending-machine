import { gql } from 'apollo-server-express';
import { GeneralFields } from './general.schema';

export default gql`
  extend type Query {
    vendingMachines(page: Int, limit: Int): VendingMachinePagination!
    vendingMachine(machineId: ID!): VendingMachine
  }

  extend type Mutation {
    createVendingMachineOrder(machineId: ID!, purchaseProducts: [PurchaseProduct!]!):String
  }

  type VendingMachine {
    machineId: ID!
    machineCode: String!
    locationId: String
    statusCode: String!
    products(page: Int, limit: Int, search: SearchVendingMachineProductInput): MachineProductPagination
    location: VendingMachineLocation
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

  type VendingMachineLocation {
    machineId: ID!
    locationId: ID!
    subdistrictCode: String!
    districtCode: String!
    provinceCode: String!
    countryCode: String!
    longitude: String!
    latitude: String!
  }

  input SearchVendingMachineProductInput {
    categories: [String!]
  }

  input PurchaseProduct {
    productId: String!
    quantity: Int!
  }
`;
