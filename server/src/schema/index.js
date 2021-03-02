import { gql } from 'apollo-server-express';

// import userSchema from './user';
// import messageSchema from './message';
import vendingMachineSchema from './vendingMachine.schema';

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

// export default [linkSchema, userSchema, messageSchema];
export default [linkSchema, vendingMachineSchema];
