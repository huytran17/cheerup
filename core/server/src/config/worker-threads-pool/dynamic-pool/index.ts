import { DynamicPool as WorkerDynamicPool } from "node-worker-threads-pool";

export default class DynamicPool {
  private static pool_instance: DynamicPool;
  private dynamic_pool_client: WorkerDynamicPool;
  private worker_size: number = 1;

  constructor() {
    if (DynamicPool.pool_instance) {
      return DynamicPool.pool_instance;
    }

    this.dynamic_pool_client = new WorkerDynamicPool(this.worker_size);

    DynamicPool.pool_instance = this;
    return this;
  }

  static getInstance() {
    if (!DynamicPool.pool_instance) {
      new DynamicPool();
    }

    return DynamicPool.pool_instance;
  }

  exec({ task, param }) {
    return new Promise<any>((resolve) => {
      const result = this.dynamic_pool_client.exec({ task, param });

      resolve(result);
    });
  }

  destroy() {
    return new Promise<void>((resolve) => {
      this.dynamic_pool_client.destroy();

      resolve();
    });
  }
}

const dynamic_pool = DynamicPool.getInstance();

export { dynamic_pool };
