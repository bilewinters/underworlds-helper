import path from "path";
import { execSync } from "child_process";
import { mkdirSync, writeFileSync } from "fs";
import { takeScreenshot, addMarketingText } from "./screenshot.utils";

import menuScreenModel from "./screenModels/MenuScreenModel";
import gameScreenModel from "./screenModels/GameScreenModel";
import summaryScreenModel from "./screenModels/SummaryScreenModel";

const wdio = require("webdriverio");

const appLocation = process.env.APP_LOCATION;
const device = process.env.DEVICE_NAME;
const shouldExpoInstall = Boolean(process.env.SHOULD_EXPO_INSTALL);
const root = path.resolve(path.join(__dirname, "../"));
const screenshotsDirectory = path.resolve(path.join(root, "screenshots"));
const imagesDirectory = path.resolve(path.join(screenshotsDirectory, "en-GB"));
const videoFile = path.resolve(path.join(imagesDirectory, `${process.env.IMAGE_PREFIX}.mp4`));
const imagePath = (imageName) =>
  path.resolve(path.join(imagesDirectory, `${imageName}_${process.env.IMAGE_PREFIX}_${imageName}.png`));

const opts = {
  "port": 4723,
  "path": "/wd/hub",
  "capabilities": process.env.ANDROID === "true" ? {
    platformName: "android",
    maxInstances: 1,
    "appium:deviceName": device,
    "appium:platformVersion": "10",
    "appium:orientation": "PORTRAIT",
    "appium:automationName": "UiAutomator2",
    "appium:app": appLocation,
    "appium:noReset": true,
    "appium:newCommandTimeout": 240,
  } : {
    "platformName": "iOS",
    "maxInstances": 1,
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
  await menuScreen.clickOnePlayerButton();

  await client.pause(2000);
  let gameScreen = await gameScreenModel(client, 1);
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.addGloryToPlayer(player1, 3);
  await gameScreen.flipGloryForPlayer(player1, 0);
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.endRound();

  await client.pause(2000);
  gameScreen = await gameScreenModel(client, 2);
  await gameScreen.flipActivationsForPlayer(player1, 1);
  await gameScreen.addGloryToPlayer(player1, 6);
  await gameScreen.flipGloryForPlayer(player1, 1, 2, 5, 6);
  await takeScreenshot(client, imagePath("0"));
  await client.pause(1000);
  await addMarketingText(imagePath("0"), "Track your\nActivations, Glory\nand Rounds");
  await gameScreen.flipActivationsForPlayer(player1, 3);
  await gameScreen.endRound();

  await client.pause(2000);
  await gameScreen.flipActivationsForPlayer(player1, 4);
  await gameScreen.addGloryToPlayer(player1, 4);
  await gameScreen.flipGloryForPlayer(player1, 3, 4, 10);
  await gameScreen.endRound();

  await client.pause(2000);
  const summaryScreen = await summaryScreenModel(client);
  await summaryScreen.toMenu();
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
  await takeScreenshot(client, imagePath("1"));
  await client.pause(1000);
  await addMarketingText(imagePath("1"), "Track you and\nyour opponent");
  await gameScreen.vsFlip();
  await client.pause(1000);
  await takeScreenshot(client, imagePath("2"));
  await client.pause(1000);
  await addMarketingText(imagePath("2"), "Both players can\nuse one device");
  await gameScreen.vsFlip();
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.flipActivationsForPlayer(player2, 1);
  await gameScreen.openSideMenu();
  await client.pause(1000);
  await takeScreenshot(client, imagePath("3"));
  await client.pause(1000);
  await addMarketingText(imagePath("3"), "Continue the last game,\nor quickly start\na new one");
  await gameScreen.closeSideMenu();
  await client.pause(1000);
  await gameScreen.endRound();

  await client.pause(2000);
  gameScreen = await gameScreenModel(client, 3);
  await gameScreen.flipActivationsForPlayer(player1, 4);
  await gameScreen.flipActivationsForPlayer(player2, 4);
  await gameScreen.addGloryToPlayer(player1, 2);
  await gameScreen.flipGloryForPlayer(player1, 4, 9);
  await gameScreen.addGloryToPlayer(player2, 6);
  await gameScreen.flipGloryForPlayer(player2, 3, 4, 5, 6, 7, 8);
  await gameScreen.endRound();

  await client.pause(2000);
  const summaryScreen = await summaryScreenModel(client);
  await takeScreenshot(client, imagePath("4"));
  await client.pause(1000);
  await addMarketingText(imagePath("4"), "Relish your victories,\nanalyse your defeats");
  await summaryScreen.toMenu();
};

const mortisFlow = async (client) => {
  const menuScreen = await menuScreenModel(client);
  await menuScreen.clickArenaMortisButton();
  await client.pause(2000);
  let gameScreen = await gameScreenModel(client, 1);
  await gameScreen.flipActivationsForPlayer(player1, 2);
  await gameScreen.addGloryToPlayer(player1, 6);
  await gameScreen.flipGloryForPlayer(player1, 0);
  await gameScreen.flipGloryForPlayer(player1, 1);
  await gameScreen.flipGloryForPlayer(player1, 2);
  await gameScreen.flipGloryForPlayer(player1, 5);
  await takeScreenshot(client, imagePath("5"));
  await client.pause(1000);
  await addMarketingText(imagePath("5"), "Supports\nArena Mortis");
  await gameScreen.openInitiative();
  await client.pause(2000);
  await takeScreenshot(client, imagePath("6"));
  await client.pause(1000);
  await addMarketingText(imagePath("6"), "Your initiative\nat your fingertips");
}

test("Perform Screenshots", async (done) => {
  const client = await wdio.remote(opts);
  if (shouldExpoInstall) {
    execSync("node_modules/expo-cli/bin/expo.js ios", { cwd: root });
  }
  mkdirSync(imagesDirectory, { recursive: true });
  // client.startRecordingScreen({ videoType: 'mpeg4', timeLimit: '300', videoQuality: 'photo', videoFps: '60'});
  await onePlayerFlow(client);
  await twoPlayerFlow(client);
  await mortisFlow(client);
  // await client.saveRecordingScreen(videoFile);
  done();
}, 600000);
