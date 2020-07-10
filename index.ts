import puppeteer from "puppeteer";
import { Cluster, ClusterHolder } from "./cluster";

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
  encoding: Encoding;
  imageFormat: ImageFormat;
  viewport?: Viewport;
  puppeteerScreenshotSettings?: any;
  caching?: boolean;
}

/**
 * nodehtml2img default settings
 */
const defaultSettings: Settings = {
  transparent: false,
  encoding: Encoding.BINARY,
  imageFormat: ImageFormat.PNG,
  caching: false,
};

/**
 * creates a task that takes a screenshost of the given
 * html content using the given settings
 * @param html
 * @param settings
 */
function createTakeScreenshotTask(html: string, settings: Settings) {
  return async function takeScreenshotTask(browser: puppeteer.Browser) {
    const {
      imageFormat,
      quality,
      transparent,
      encoding,
      puppeteerScreenshotSettings,
      caching,
    } = settings;

    const page = await browser.newPage();
    await page.setCacheEnabled(caching);

    const screenshotSettings = {
      quality,
      ...puppeteerScreenshotSettings,
    };

    if (imageFormat === ImageFormat.JPEG) {
      screenshotSettings.quality = quality ? quality : 80;
    }

    const { viewport } = settings;
    if (viewport) {
      const { width, height, deviceScaleFactor } = viewport;
      await page.setViewport({ width, height, deviceScaleFactor });
    }

    await page.setContent(html);

    const element = await page.$("body");

    if (!element) {
      throw new Error(
        `An error occurred while obtaining the body element out of the puppeteer page.
        It's most likely to be a puppeteer problem`
      );
    }

    const result = await element.screenshot({
      type: imageFormat,
      omitBackground: transparent,
      encoding,
      ...screenshotSettings,
    });

    await page.close();

    return result;
  };
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
  const cluster = await getCluster();
  const result = await cluster.execute(
    createTakeScreenshotTask(html, settings)
  );
  return result;
}

/**
 * initilizes the resources used by nodehtml2img.
 *
 * If you don't call this method, all resources will be initialized when you call nodehtml2img function.
 * But initialize through this method is preferred if you want to
 * initialize all resources, for instance, in the application load.
 *
 * @return context with intialized resources
 */
export async function init() {
  const cluster = await getCluster();
  return { puppeteerCluster: cluster };
}

/**
 * initializes (if it wasn't already) and returns
 * the cluster.
 */
async function getCluster() {
  const cluster: Cluster<string> = await ClusterHolder.getInstance();
  return cluster;
}
