/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
export const getElement = async (client, selector, timeout = 10000) => {
  let timeoutCount = timeout / 1000;
  let element = await client.$(selector);
  while (element.error && timeoutCount > 0) {
    timeoutCount--;
    await client.pause(1000);
    element = await client.$(selector);
  }
  if (element.error) {
    throw element.error;
  }
  return element;
};

export const takeScreenshot = async (client, fileName) => {
  await client.pause(1500);
  await client.saveScreenshot(fileName);
  return client.pause(1500);
};
