import { ClusterSettings } from "./Cluster";
import * as os from "os";

function getWorkersNumber() {
  const maxConcurrency = process.env.PUPPETEER_WORKERS_NUMBER;
  if (maxConcurrency) {
    return Number.parseInt(maxConcurrency);
  }
  return os.cpus.length;
}

function getIntervalBetweenTasks() {
  const intervalBetweenTasks = process.env.INTERVAL_BETWEEN_TASKS;
  if (intervalBetweenTasks) {
    return Number.parseInt(intervalBetweenTasks);
  }
  return 10;
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

function getExecutionTimeout() {
  const timeoutString = process.env.PUPPETEER_CLUSTER_TIMEOUT;
  if (timeoutString) {
    return Number.parseInt(timeoutString);
  }
  return 30000;
}

export default <ClusterSettings>{
  intervalBetweenTasks: getIntervalBetweenTasks(),
  workersNumber: getWorkersNumber(),
  puppeteerSettings: {
    headless: isPuppeteerHeadless(),
    args: getPuppeteerArgs(),
  },
};
