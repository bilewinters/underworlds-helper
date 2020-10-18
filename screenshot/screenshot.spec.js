import path from "path";
import { execSync } from "child_process";
import { mkdirSync } from "fs";
import { takeScreenshot } from "./screenshot.utils";

import menuScreenModel from "./screenModels/MenuScreenModel";
import gameScreenModel from "./screenModels/GameScreenModel";
import summaryScreenModel from "./screenModels/SummaryScreenModel";

const wdio = require("webdriverio");

const appLocation = process.env.APP_LOCATION;
const device = process.env.DEVICE_NAME;
const shouldExpoInstall = Boolean(process.env.SHOULD_EXPO_INSTALL);
const root = path.resolve(path.join(__dirname, "../"));
const screenshotsDirectory = path.resolve(
  path.join(root, "marketing/screenshots")
);
const imagesDirectory = path.resolve(path.join(screenshotsDirectory, device));
const imagePath = (imageName) =>
  path.resolve(path.join(imagesDirectory, imageName));

const opts = {
  port: 4723,
  path: "/wd/hub",
  capabilities: {
    platformName: "iOS",
    maxInstances: 1,
    "appium:deviceName": device,
    "appium:platformVersion": "13.5",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "XCUITest",
    "appium:app": appLocation,
    "appium:noReset": true,
    "appium:newCommandTimeout": 240,
  },
};

const player1 = 0;
const player2 = 1;

const onePlayerFlow = async (client) => {
  const menuScreen = await menuScreenModel(client);
  await takeScreenshot(client, imagePath("1-01-menu.png"));
  // await menuScreen.clickOnePlayerButton();

  // await client.pause(2000);
  // let gameScreen = await gameScreenModel(client, 1);
  // await gameScreen.flipActivationsForPlayer(player1, 2);
  // await gameScreen.addGloryToPlayer(player1, 3);
  // await gameScreen.flipGloryForPlayer(player1, 0);
  // await takeScreenshot(client, imagePath("1-02-OnePlayerRoundOne.png"));
  // await gameScreen.flipActivationsForPlayer(player1, 2);
  // await gameScreen.endRound();

  // await client.pause(2000);
  // gameScreen = await gameScreenModel(client, 2);
  // await gameScreen.flipActivationsForPlayer(player1, 1);
  // await gameScreen.addGloryToPlayer(player1, 6);
  // await gameScreen.flipGloryForPlayer(player1, 1, 2, 5, 6);
  // await takeScreenshot(client, imagePath("1-03-OnePlayerRoundTwo.png"));
  // await gameScreen.flipActivationsForPlayer(player1, 3);
  // await gameScreen.endRound();

  // await client.pause(2000);
  // await gameScreen.flipActivationsForPlayer(player1, 4);
  // await gameScreen.addGloryToPlayer(player1, 4);
  // await gameScreen.flipGloryForPlayer(player1, 3, 4, 10);
  // await takeScreenshot(client, imagePath("1-04-OnePlayerRoundThree.png"));
  // await gameScreen.endRound();

  // await client.pause(2000);
  // const summaryScreen = await summaryScreenModel(client);
  // await takeScreenshot(client, imagePath("1-05-OnePlayerSummary.png"));
  // await summaryScreen.toMenu();
};

const twoPlayerFlow = async (client) => {
  const menuScreen = await menuScreenModel(client);
  await menuScreen.clickTwoPlayerButton();

  await client.pause(2000);
  let gameScreen = await gameScreenModel(client, 1);
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.flipActivationsForPlayer(player2, 1);
  await gameScreen.addGloryToPlayer(player1, 4);
  await gameScreen.flipGloryForPlayer(player1, 0);
  await gameScreen.addGloryToPlayer(player2, 2);
  await takeScreenshot(client, imagePath("2-01-TwoPlayerRoundOne.png"));
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.flipActivationsForPlayer(player2, 3);
  await gameScreen.endRound();

  await client.pause(2000);
  gameScreen = await gameScreenModel(client, 2);
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.flipActivationsForPlayer(player2, 3);
  await gameScreen.addGloryToPlayer(player1, 7);
  await gameScreen.flipGloryForPlayer(player1, 1, 2, 3, 7, 8);
  await gameScreen.addGloryToPlayer(player2, 4);
  await gameScreen.flipGloryForPlayer(player2, 0, 1, 2);
  await takeScreenshot(client, imagePath("2-02-TwoPlayerRoundTwo.png"));
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.flipActivationsForPlayer(player2, 1);
  await gameScreen.endRound();

  await client.pause(2000);
  gameScreen = await gameScreenModel(client, 3);
  await gameScreen.flipActivationsForPlayer(player1, 4);
  await gameScreen.flipActivationsForPlayer(player2, 4);
  await gameScreen.addGloryToPlayer(player1, 2);
  await gameScreen.flipGloryForPlayer(player1, 4, 9);
  await gameScreen.addGloryToPlayer(player2, 6);
  await gameScreen.flipGloryForPlayer(player2, 3, 4, 5, 6, 7, 8);
  await takeScreenshot(client, imagePath("2-03-TwoPlayerRoundThree.png"));
  await gameScreen.endRound();

  await client.pause(2000);
  const summaryScreen = await summaryScreenModel(client);
  await takeScreenshot(client, imagePath("2-04-TwoPlayerSummary.png"));
  await summaryScreen.toMenu();
};

test("Perform Screenshots", async (done) => {
  const client = await wdio.remote(opts);
  if (shouldExpoInstall) {
    execSync("node_modules/expo-cli/bin/expo.js ios", { cwd: root });
  }
  mkdirSync(imagesDirectory, { recursive: true });
  await onePlayerFlow(client);
  done();
  // await twoPlayerFlow(client);
}, 600000);
