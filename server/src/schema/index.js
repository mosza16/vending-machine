import { gql } from 'apollo-server-express';

// import userSchema from './user';
// import messageSchema from './message';
import vendingMachineSchema from './vendingMachine.schema';
import productSchema from './product.schema';

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

export default [linkSchema, vendingMachineSchema, productSchema];
