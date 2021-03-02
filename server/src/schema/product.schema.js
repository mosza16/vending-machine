import { gql } from 'apollo-server-express';
import { GeneralFields } from './general.schema';

export default gql`
type Product {
    productId: ID!
    productCode: String!
    name: String!
    thPrice: Float!
    note: String
    imageUrl: String
    ${GeneralFields}
  }
`;
