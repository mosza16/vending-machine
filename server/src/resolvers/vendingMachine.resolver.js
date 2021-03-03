import Sequelize from 'sequelize';
import { path } from 'ramda';
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
    vendingMachine: async (parent, args, { models }) => {
      const { machineId } = args;
      const data = await models.VendingMachine.findOne({
        where: { machineId },
      });
      return data;
    },
  },

  VendingMachine: {
    products: async (parent, args, { models }) => {
      const { machineId } = parent;
      const categories = path(['search', 'categories'], args);
      const data = await models.VendingMachineProduct.findAndCountAll({
        ...getLimitOffset(args),
        order: [[models.Product, 'name', 'asc']],
        include: [
          {
            model: models.Product,
            include: [
              {
                model: models.CategoryProduct,
                include: [{ model: models.Category }],
              },
            ],
          },
        ],
        where: {
          machine_id: {
            [Sequelize.Op.eq]: machineId,
          },
          ...(categories
            ? {
                '$product.category_product.category.category_id$': {
                  [Sequelize.Op.in]: categories,
                },
              }
            : {}),
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
