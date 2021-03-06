import * as OneSignal from 'onesignal-node';
import Sequelize from 'sequelize';

export const sendOutOfStockNotification = async (client, models, machineId) => {
  const adminUsers = await models.AdminUser.findAll({});
  if (adminUsers.length > 0) {
    const userIds = adminUsers.map(({ userId }) => userId);
    const vendingMachine = await models.VendingMachine.findOne({
      where: {
        machine_id: { [Sequelize.Op.eq]: machineId },
      },
    });
    const { machineCode } = vendingMachine;
    const notification = {
      headings: {
        en: `Out of Stock Warning (${machineCode})`,
      },
      contents: {
        en: `There are almost out of stock products on machine code ${machineCode}`,
      },
      include_external_user_ids: userIds,
    };

    try {
      const response = await client.createNotification(notification);
      console.log(response.body.id);
    } catch (error) {
      if (error instanceof OneSignal.HTTPError) {
        console.error(error.statusCode);
        console.error(error.body);
      }
    }
  }
};
