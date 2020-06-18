import puppeteer from "puppeteer";

/**
 * available encoding formats
 */
export enum Encoding {
  BINARY = "binary",
  BASE_64 = "base64",
}

/**
 * available image formats
 */
export enum ImageFormat {
  JPEG = "jpeg",
  PNG = "png",
}

/**
 * html2img settings structure
 */
export interface Settings {
  quality?: number;
  transparent: boolean;
  puppeteerArgs: any;
  encoding: Encoding;
  imageFormat: ImageFormat;
}

/**
 * nodehtml2img default settings
 */
const defaultSettings: Settings = {
  transparent: false,
  puppeteerArgs: {},
  encoding: Encoding.BINARY,
  imageFormat: ImageFormat.PNG,
};

/**
 * generates an image from the given html content
 * @param html html content in which an imagem will be generated
 * @param settings image cration settings
 */
export default async function (
  html: string,
  settings: Settings = defaultSettings
) {
  const {
    imageFormat,
    quality,
    transparent,
    puppeteerArgs,
    encoding,
  } = settings;

  const screenshotSettings = {
    quality,
  };

  if (imageFormat === ImageFormat.JPEG) {
    screenshotSettings.quality = quality ? quality : 80;
  }

  const browser = await puppeteer.launch({ ...puppeteerArgs, headless: true });
  const page = await browser.newPage();

  await page.setContent(html);
  const element = await page.$("body");

  if (!element) {
    throw new Error(
      "An error occurred while obtaining the body element out of the puppeteer page. It's most likely to be a puppeteer problem"
    );
  }

  const buffer = await element.screenshot({
    type: imageFormat,
    omitBackground: transparent,
    encoding,
    ...screenshotSettings,
  });

  await browser.close();
  return buffer;
}
