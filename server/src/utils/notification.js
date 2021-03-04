import * as OneSignal from 'onesignal-node';

export const sendOutOfStockNotification = async (
  client,
  machineCode,
  models
) => {
  const notification = {
    headings: {
      en: `Out of Stock Warning (${machineCode})`,
    },
    contents: {
      en: `There are almost out of stock products on machine code ${machineCode}`,
    },
    include_external_user_ids: ['f8dd93af-4532-4f6d-a404-94fabfb17df6'],
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
};
