import { gql } from 'apollo-server-express';

import vendingMachineSchema from './vendingMachine.schema';
import productSchema from './product.schema';
import userSchema from './user.schema';

const linkSchema = gql`
  scalar Date

  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, vendingMachineSchema, productSchema, userSchema];
