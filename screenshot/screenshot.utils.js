/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
import sharp from "sharp";

export const iPhone11ProMaxDimensions = {
  width: 1242,
  height: 2688,
};

export const getElement = async (client, selector, timeout = 10000) => {
  let timeoutCount = timeout / 1000;
  let elements = await client.$$(selector);
  while ((elements.error || elements.length < 1) && timeoutCount > 0) {
    timeoutCount--;
    await client.pause(1000);
    elements = await client.$$(selector);
  }
  if (elements.error || elements.length < 1) {
    throw elements.error || "Unable to find element with selector " + selector;
  }
  return elements[elements.length - 1];
};

export const takeScreenshot = async (client, fileName) => {
  await client.pause(1500);
  await client.saveScreenshot(fileName);
  return client.pause(1500);
};

const createSvgTextImageBuffer = (text, verticalTextSpace, width, height) => {
  const fontSize = 80;
  const lineHeight = Math.floor(fontSize * 1.1);
  const halfLineHeight = Math.floor(lineHeight / 2);
  const lines = text.split("\n");
  const firstLineVertical = Math.floor(verticalTextSpace / 2) + halfLineHeight - (halfLineHeight * (lines.length - 1))

  return Buffer.from(
    `<svg width="${width}" height="${height}">
      ${lines.map((line, index) => `<text x="50%" y="${
        firstLineVertical + (index * lineHeight)
      }" text-anchor="middle" font-size="${fontSize}" font-family="Sava Pro" font-weight="semibold" fill="#fff">${line}</text>`)}
    </svg>`
  );
};

export const addMarketingText = async (imageFile, text) => {
  const imageShrinkMultiplier = 0.8;
  const textSpaceMultiplier = 1 - imageShrinkMultiplier;

  const originalImage = await sharp(imageFile);
  const { width, height } = await originalImage.metadata();
  const verticalTextSpace = Math.floor(height * textSpaceMultiplier);
  const textBuffer = createSvgTextImageBuffer(text, verticalTextSpace, width, height);
  const resizedImageBuffer = await originalImage
    .resize(Math.floor(width * imageShrinkMultiplier), Math.floor(height * imageShrinkMultiplier))
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
