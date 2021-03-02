export default {
  Query: {
    vendingMachines: async (parent, args, { models }) => {
      return await models.VendingMachine.findAll();
    },
  },
};
