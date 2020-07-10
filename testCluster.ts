import { Cluster } from "./cluster";
import puppeteer from "puppeteer";

function createScreenshotTask(html: string) {
  return async (browser: puppeteer.Browser): Promise<string> => {
    const page = await browser.newPage();

    await page.setCacheEnabled(false);

    const screenshotSettings = {
      quality: 100,
    };

    await page.setViewport({
      height: 1361,
      width: 600,
      deviceScaleFactor: 2,
    });

    await page.setContent(html);
    const target = await page.$("body");

    if (!target) {
      throw new Error(
        `An error occurred while obtaining the body element out of the puppeteer page.
        It's most likely to be a puppeteer problem`
      );
    }
    const result = await target.screenshot({
      type: "jpeg",
      omitBackground: false,
      encoding: "base64",
      ...screenshotSettings,
    });

    await page.close();

    return result;
  };
}

(async () => {
  const cluster = new Cluster<string>({
    workersNumber: 2,
    intervalBetweenTasks: 10,
    puppeteerSettings: {
      headless: true,
    },
  });

  await cluster.launch();

  setInterval(async () => {
    const base64: string = await cluster.execute(
      createScreenshotTask("<h1>Hello, World!</h1>")
    );
    console.log("generated base64: ", base64.substring(0, 50) + "...");
  }, 1000);
})();
