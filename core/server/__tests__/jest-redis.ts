import { createClient } from "redis";
import { logger } from "./jest-logger";

export type RedisClientType = ReturnType<typeof createClient>;

export default class Redis {
  private static redis_instance: Redis;
  private redis_client: undefined | RedisClientType;

  constructor() {
    if (Redis.redis_instance) {
      return Redis.redis_instance;
    }

    try {
      const client = createClient();

      client.on("error", (error) => console.error(error));

      client
        .connect()
        .then(() => console.log("Successfully connected to Redis server"));

      this.redis_client = client;
      Redis.redis_instance = this;
    } catch (error) {
      console.error(error);
    }
  }

  setData({
    key,
    value,
    duration_in_seconds,
  }: {
    key: string;
    value: string;
    duration_in_seconds?: number;
  }): void {
    if (!this.redis_client) {
      logger.warn("Redis Client: Not available");
      return;
    }

    const invald_data = !key || !value;
    if (invald_data) {
      logger.warn("Redis Client: Invalid data to set");
      return;
    }

    this.redis_client
      .set(key, JSON.stringify(value), {
        EX: duration_in_seconds,
      })
      .then(() => logger.verbose(`Redis Client: Cached data for key: ${key}`))
      .catch((error) => logger.error(error));

    return;
  }

  async getData({ key }: { key: string }): Promise<void> {
    if (!this.redis_client) {
      logger.warn("Redis Client: Not available");
      return;
    }

    const invald_data = !key;
    if (invald_data) {
      logger.warn("Redis Client: Invalid dataset");
      return;
    }

    try {
      const cached_data = await this.redis_client.get(key);
      if (!!cached_data && typeof cached_data === "string") {
        return JSON.parse(cached_data);
      }
    } catch (error) {
      console.error(error);
      await this.deleteData({ key });
    }

    return;
  }

  async deleteData({ key }: { key: string }): Promise<void> {
    if (!this.redis_client) {
      logger.warn("Redis Client: Not available");
      return;
    }

    const invald_data = !key;
    if (invald_data) {
      logger.warn("Redis Client: Invalid key to get");
      return;
    }

    try {
      await this.redis_client.unlink(key);
    } catch (error) {
      console.error(error);
    }

    return;
  }

  static getRedisInstance() {
    if (Redis.redis_instance) {
      return Redis.redis_instance;
    }

    new Redis();
    return Redis.redis_instance;
  }
}

const redis = Redis.getRedisInstance();

export { redis };
