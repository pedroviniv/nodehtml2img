import { Cluster } from "puppeteer-cluster";
import settings from "./settings";

/**
 * holds a single instance of the cluster
 */
export default class ClusterHolder {
  static INSTANCE: any;

  static async init() {
    return await Cluster.launch(settings);
  }

  static async getInstance() {
    if (!ClusterHolder.INSTANCE) {
      ClusterHolder.INSTANCE = await ClusterHolder.init();
    }
    return ClusterHolder.INSTANCE;
  }
}
