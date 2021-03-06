import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import * as OneSignal from 'onesignal-node';
import redis from 'redis';
import http from 'http';
import resolvers from './resolvers';
import schema from './schema';
import models, { sequelize } from './models';

const app = express();

app.use(cors());

// setup redis client
const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
});
redisClient.on('error', (error) => {
  console.log('Could not establish a connection with redis. ' + error);
});
redisClient.on('connect', () => {
  console.log('Connected to redis successfully');
});

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
  context: async ({ req }) => {
    if (req) {
      const sessionId = req.headers['x-session-id'];
      return {
        sessionId,
        models,
        oneSignalClient,
        redisClient,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const httpServer = http.createServer(app);

const port = process.env.PORT || 4040;

sequelize.sync({ force: false }).then(async () => {
  httpServer.listen({ port }, () => {
    console.log(`Apollo Server running on http://localhost:${port}/graphql`);
  });
});
