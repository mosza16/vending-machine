import Sequelize from 'sequelize';
import { path } from 'ramda';
import { uuid } from 'uuidv4';
import { getLimitOffset } from '../utils/pagination';
import { calculateProductsPrice } from '../utils/price';
import { sequelize } from '../models';

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
  Mutation: {
    createVendingMachineOrder: async (parent, args, { models }) => {
      const { machineId, purchaseProducts = [] } = args;
      const productIds = purchaseProducts.map(({ productId }) => productId);
      const vendingMachineProducts = await models.VendingMachineProduct.findAll(
        {
          where: {
            product_id: { [Sequelize.Op.in]: productIds },
            machine_id: { [Sequelize.Op.eq]: machineId },
          },
          include: [
            {
              model: models.Product,
            },
          ],
        }
      );

      // prepare data from insert order and order product
      const _purchaseProducts = purchaseProducts.map((purchaseProduct) => {
        const vendingMachineProduct = vendingMachineProducts.find(
          ({ productId }) => productId === purchaseProduct.productId
        );
        return {
          productId: purchaseProduct.productId,
          price: vendingMachineProduct.product.thPrice,
          quantity: purchaseProduct.quantity,
        };
      });
      const order = {
        orderId: uuid(),
        thTotalPrices: calculateProductsPrice(_purchaseProducts),
        machineId,
      };
      const orderProducts = _purchaseProducts.map((purchaseProduct) => {
        return {
          orderProductId: uuid(),
          orderId: order.orderId,
          thTotalPrices: purchaseProduct.price * purchaseProduct.quantity,
          quantity: purchaseProduct.quantity,
          productId: purchaseProduct.productId,
        };
      });

      // prepare data from update vending machine product
      const newVendingMachineProducts = purchaseProducts.map(
        (purchaseProduct) => {
          const vendingMachineProduct = vendingMachineProducts.find(
            ({ productId }) => productId === purchaseProduct.productId
          );
          return {
            productId: purchaseProduct.productId,
            machineId,
            quantity: vendingMachineProduct.quantity - purchaseProduct.quantity,
          };
        }
      );

      // start transaction create vending machine order
      try {
        await sequelize.transaction(async (t) => {
          await models.Order.create(order, { transaction: t });
          await Promise.all(
            orderProducts.map((orderProduct) => {
              return models.OrderProduct.create(orderProduct, {
                transaction: t,
              });
            })
          );

          await Promise.all(
            newVendingMachineProducts.map((vendingMachineProduct) => {
              return models.VendingMachineProduct.update(
                {
                  quantity: vendingMachineProduct.quantity,
                },
                {
                  where: {
                    product_id: {
                      [Sequelize.Op.eq]: vendingMachineProduct.productId,
                    },
                    machine_id: {
                      [Sequelize.Op.eq]: vendingMachineProduct.machineId,
                    },
                  },
                  transaction: t,
                }
              );
            })
          );
        });

        // check and send notification to admin
        const notificationProducts = newVendingMachineProducts.filter((newVendingMachineProducts) => {
          return newVendingMachineProducts.quantity < 10
        })
        if(notificationProducts.length > 0){
          // logic send notification here
        }
        return 'ok';
      } catch (error) {
        console.error(error);
        throw error;
      }
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
