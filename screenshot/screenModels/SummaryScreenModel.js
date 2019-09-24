import { getElement } from '../screenshot.utils';

const summaryScreenModel = async client => {
  const menuButton = await getElement(client, '~to-menu-button');

  return {
    toMenu: async () => menuButton.click(),
    backToGame: async () => (await getElement(client, '~back-to-game-button')).click(),
  };
};

export default summaryScreenModel;
