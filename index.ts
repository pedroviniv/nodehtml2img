import puppeteer, { Page } from "puppeteer";
import ClusterHolder from "./cluster/ClusterHolder";
import { Cluster } from "puppeteer-cluster";

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
}

/**
 * nodehtml2img default settings
 */
const defaultSettings: Settings = {
  transparent: false,
  encoding: Encoding.BINARY,
  imageFormat: ImageFormat.PNG,
};

type Data = { html: string; settings: Settings };

async function takeScreenshot(args: any) {
  const page: Page = args.page;
  const data: Data = args.data;

  const { html, settings } = data;

  const { imageFormat, quality, transparent, encoding } = settings;

  const screenshotSettings = {
    quality,
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
  const result = await page.screenshot({
    type: imageFormat,
    omitBackground: transparent,
    encoding,
    ...screenshotSettings,
  });

  await page.close();
  return result;
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
  const cluster: Cluster<Data, any> = await ClusterHolder.getInstance();
  const result = await cluster.execute({ html, settings }, takeScreenshot);
  return result;
}
