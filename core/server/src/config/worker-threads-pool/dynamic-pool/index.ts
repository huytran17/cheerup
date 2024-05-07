import { DynamicPool as WorkerDynamicPool } from "node-worker-threads-pool";

export default class DynamicPool {
  private static pool_instance: DynamicPool;
  private pool: WorkerDynamicPool;
  private worker_size: number = 1;

  constructor() {
    if (DynamicPool.pool_instance) {
      return DynamicPool.pool_instance;
    }

    this.pool = new WorkerDynamicPool(this.worker_size);

    DynamicPool.pool_instance = this;

    console.log("Dynamic worker threads pool initialized");
  }

  static getInstance() {
    if (!DynamicPool.pool_instance) {
      return new DynamicPool();
    }

    return DynamicPool.pool_instance;
  }

  exec({ task, param }) {
    return new Promise<any>((resolve) => {
      const result = this.pool.exec({ task, param });

      resolve(result);
    });
  }

  destroy() {
    return new Promise<void>((resolve) => {
      this.pool.destroy();

      resolve();
    });
  }
}

const dynamic_pool = DynamicPool.getInstance();
export { dynamic_pool };
