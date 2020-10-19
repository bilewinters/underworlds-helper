/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import sharp from "sharp";

export const iPhone11ProMaxDimensions = {
  width: 1242,
  height: 2688,
};

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

const createSvgTextImageBuffer = (text, width, height) => {
  const paddingTop = height * 0.025;
  const lines = text.split("\n");
  const lineHeight = Math.floor((height * 0.175) / lines.length);
  const halfLineHeight = Math.floor(lineHeight / 2);
  return Buffer.from(
    `<svg width="${width}" height="${height}">
     ${lines.map(
       (line, index) =>
         `<text x="50%" y="${
           lineHeight * (index + 1) - halfLineHeight + paddingTop
         }" text-anchor="middle" font-size="100" fill="#fff">${line}</text>`
     )}
   </svg>`
  );
};

export const addMarketingText = async (imageFile, text) => {
  const originalImage = await sharp(imageFile);
  const { width, height } = await originalImage.metadata();
  const textBuffer = createSvgTextImageBuffer(text, width, height);
  const resizedImageBuffer = await originalImage
    .resize(Math.floor(width * 0.8), Math.floor(height * 0.8))
    .toBuffer();

  return sharp({
    create: {
      width,
      height,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 1 },
    },
  })
    .composite([
      {
        input: resizedImageBuffer,
        gravity: "south",
      },
      {
        input: textBuffer,
      },
    ])
    .toFile(imageFile);
};
