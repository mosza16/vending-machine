import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as OneSignal from 'onesignal-node';

import http from 'http';

import resolvers from './resolvers';
import schema from './schema';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

// setup one signal
const oneSignalClient = new OneSignal.Client(
  process.env.ONESIGNAL_APP_ID,
  process.env.ONESIGNAL_API_KEY
);

// setup graphql server
const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        oneSignalClient,
      };
    }

    if (req) {
      return {
        models,
        oneSignalClient,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

const port = process.env.PORT || 4040;

sequelize.sync({ force: false }).then(async () => {
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server running on http://localhost:${port}/graphql`);
  });
});
