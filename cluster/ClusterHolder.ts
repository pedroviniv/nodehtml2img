import { Cluster } from "puppeteer-cluster";
import settings from "./settings";
import { TaskFunction } from "puppeteer-cluster/dist/Cluster";

/**
 * holds a single instance of the cluster
 */
export default class ClusterHolder {
  static INSTANCE: Cluster<any, any>;

  static async init(onLoad: (cluster: Cluster<any, any>) => Promise<void>) {
    const cluster = await Cluster.launch(settings);
    await onLoad(cluster);
    return cluster;
  }

  static async getInstance(
    onLoad: (cluster: Cluster<any, any>) => Promise<void>
  ) {
    if (!ClusterHolder.INSTANCE) {
      ClusterHolder.INSTANCE = await ClusterHolder.init(onLoad);
    }
    return ClusterHolder.INSTANCE;
  }
}
