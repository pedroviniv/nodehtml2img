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
 * settings for defining a viewport
 */
export interface Viewport {
  /**
   * width (in pixels)
   */
  width: number;
  /**
   * height (in pixels)
   */
  height: number;
  /**
   * device scale factor (can be thought of as dpr)
   */
  deviceScaleFactor: number;
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
  viewport?: Viewport;
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
 * creates a new page using the given html, on the given browser, based on the
 * given settings.
 * @param html content that will be rendered in the page created
 * @param browser instance of puppeteer browser that will create the page
 * @param settings settings with the viewport definition of the page
 */
async function createPage(
  html: string,
  browser: puppeteer.Browser,
  settings: Settings
): Promise<puppeteer.Page> {
  const page = await browser.newPage();
  await page.setContent(html);

  /**
   * setting the viewport definition if it was provided
   */
  if (settings.viewport) {
    const { viewport } = settings;
    const { width, height, deviceScaleFactor } = viewport;
    await page.setViewport({ width, height, deviceScaleFactor });
  }

  return page;
}

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
  const page = await createPage(html, browser, settings);
  const element = await page.$("body");

  if (!element) {
    throw new Error(
      `An error occurred while obtaining the body element out of the puppeteer page.
      It's most likely to be a puppeteer problem`
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
