import Sequelize from 'sequelize';
import { getLimitOffset } from '../utils/pagination';

export default {
  Query: {
    vendingMachines: async (parent, args, { models }) => {
      const data = await models.VendingMachine.findAndCountAll({
        ...getLimitOffset(args),
      });
      return {
        count: data.count,
        rows: data.rows,
        page: args.page,
        limit: args.limit,
      };
    },
  },

  VendingMachine: {
    products: async (parent, args, { models }) => {
      const { machineId } = parent;
      const data = await models.VendingMachineProduct.findAndCountAll({
        ...getLimitOffset(args),
        order: [[models.Product, 'name', 'asc']],
        include: [{ model: models.Product }],
        where: {
          machine_id: {
            [Sequelize.Op.eq]: machineId,
          },
        },
      });
      return {
        count: data.count,
        rows: data.rows,
        page: args.page,
        limit: args.limit,
      };
    },
  },
};
