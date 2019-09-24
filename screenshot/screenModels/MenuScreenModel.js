import { getElement } from '../screenshot.utils';

const menuScreenModel = async client => {
  const onePlayerButton = await getElement(client, '~menu-1-player-button');

  return {
    clickOnePlayerButton: async () => onePlayerButton.click(),
    clickTwoPlayerButton: async () => (await getElement(client, '~menu-2-player-button')).click(),
    clickContinueButton: async () => (await getElement(client, '~menu-continue-button')).click(),
  };
};

export default menuScreenModel;
