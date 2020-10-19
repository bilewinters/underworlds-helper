/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable security/detect-object-injection */
import { getElement } from '../screenshot.utils';

const gameScreenModel = async (client, round) => {
  await getElement(client, '~round-label');
  const playerNextActivation = [round * 4 - 4, round * 4 - 4];

  const model = {};

  model.getRound = async () => round;

  model.addGloryToPlayer = async (player, gloryAmount = 1) => {
    const element = await getElement(client, `~player-${player}-glory-add-button`);
    for (let i = 0; i < gloryAmount; i++) {
      await element.click();
    }
    return model;
  };

  model.removeGloryFromPlayer = async player => {
    const element = await getElement(client, `~player-${player}-glory-remove-button`);
    await element.click();
    return model;
  };

  model.flipNextActivationForPlayer = async player => {
    const activationNumber = playerNextActivation[player];
    playerNextActivation[player] = activationNumber + 1;
    const activationElement = await getElement(
      client,
      `~player-${player}-activation-token-${activationNumber}`,
    );
    await activationElement.click();
    return model;
  };

  model.flipActivationsForPlayer = async (player, activations) => {
    for (let i = 0; i < activations; i++) {
      await model.flipNextActivationForPlayer(player);
    }
    return model;
  };

  model.flipGloryForPlayer = async (player, ...tokens) => {
    await Promise.all(
      tokens.map(async token => {
        const element = await getElement(client, `~player-${player}-glory-token-${token}`);
        await element.click();
      }),
    );
    return model;
  };

  model.vsFlip = async () => {
    const element = await getElement(client, '~vs-rotate-icon');
    await element.click();
    return model;
  }

  model.endRound = async () => {
    const element = await getElement(client, '~end-of-round-button');
    await element.click();
    return model;
  };

  model.openSideMenu = async () => {
    const element = await getElement(client, '~burger-menu-icon');
    await element.click();
    return model;
  };

  model.closeSideMenu = async () => {
    const element = await getElement(client, '~x-close-icon');
    await element.click();
    return model;
  };

  model.openInitiative = async () => {
    const element = await getElement(client, '~change-initiative');
    await element.click();
    return model;
  };

  model.selectInitiative = async (value) => {
    const element = await getElement(client, `~initiative-token-${value}`);
    await element.click();
    return model;
  };

  return model;
};

export default gameScreenModel;
