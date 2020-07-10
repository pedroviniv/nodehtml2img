import Cluster from "./Cluster";
import settings from "./settings";

/**
 * holds a single instance of the cluster
 */
export default class ClusterHolder {
  static INSTANCE: Cluster<any>;

  static async init() {
    const cluster = new Cluster<any>(settings);
    await cluster.launch();
    return cluster;
  }

  static async getInstance() {
    if (!ClusterHolder.INSTANCE) {
      ClusterHolder.INSTANCE = await ClusterHolder.init();
    }
    return ClusterHolder.INSTANCE;
  }
}
