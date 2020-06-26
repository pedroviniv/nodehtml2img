import { Cluster } from "puppeteer-cluster";
import * as os from "os";

function getConcurrency(): number {
  const concurrency = process.env.PUPPETEER_CLUSTER;
  if (concurrency) {
    return Number.parseInt(concurrency);
  }
  return Cluster.CONCURRENCY_CONTEXT;
}

function getMaxConcurrency() {
  const maxConcurrency = process.env.PUPPETEER_CLUSTER_MAX_CONCURRENCY;
  if (maxConcurrency) {
    return Number.parseInt(maxConcurrency);
  }
  return os.cpus.length;
}

function isPuppeteerHeadless() {
  const headless = process.env.PUPPETEER_IS_HEADLESS;
  if (headless) {
    return headless === "true";
  }
  return true;
}

function getPuppeteerArgs() {
  const args = process.env.PUPPETEER_ARGS;
  if (args) {
    const processed = args.split(",").map((arg) => arg.trim());
    return processed;
  }

  return ["--no-sandbox"];
}

export default {
  concurrency: getConcurrency(),
  maxConcurrency: getMaxConcurrency(),
  puppeteerOptions: {
    headless: isPuppeteerHeadless(),
    args: getPuppeteerArgs(),
  },
};
