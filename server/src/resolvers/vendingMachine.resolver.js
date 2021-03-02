export default {
  Query: {
    vendingMachines: async (parent, args, { models }) => {
      const { page = 1, limit = 20 } = args;
      const offset = page - 1;
      const data = await models.VendingMachine.findAndCountAll({
        limit: limit < 0 ? 0 : limit,
        offset: offset < 0 ? 0 : offset,
      });
      return { count: data.count, rows: data.rows, page, limit };
    },
  },
};
