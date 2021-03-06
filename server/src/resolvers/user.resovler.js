import Sequelize from 'sequelize';
import { AuthenticationError } from 'apollo-server';
import bcrypt from 'bcrypt';
import { uuid } from 'uuidv4';

export default {
  Query: {
    checkAuthenticated: async (parent, args, { sessionId, redisClient }) => {
      const value = await new Promise((resolve) => {
        redisClient.get(`session:${sessionId}`, (_, _value) => {
          resolve(_value);
        });
      });
      if (!value) {
        throw new AuthenticationError('Not authenticated');
      }
      return value;
    },
  },
  Mutation: {
    login: async (parent, args, { models, redisClient }) => {
      const { username, password } = args;
      const adminUser = await models.AdminUser.findOne({
        where: {
          [Sequelize.Op.or]: [{ email: username }, { phone: username }],
        },
      });

      if (!adminUser) {
        throw new AuthenticationError('user not found');
      }

      const match = await bcrypt.compare(password, adminUser.password);
      if (!match) {
        throw new AuthenticationError('user not found');
      }

      const _sessionId = `${adminUser.userId}:${uuid()}`;
      const redisKey = `session:${_sessionId}`;
      redisClient.setex(
        redisKey,
        86400000, // one day
        JSON.stringify({ userId: adminUser.userId })
      );
      return {
        session: _sessionId,
        userId: adminUser.userId,
      };
    },
    createAdminUser: async (parent, args, { models }) => {
      const {
        user: { phone, email, password },
      } = args;
      const passwordHash = await bcrypt.hash(password, 3);
      await models.AdminUser.create({
        userId: uuid(),
        phone,
        email,
        password: passwordHash,
      });
      return 'ok';
    },
  },
};
