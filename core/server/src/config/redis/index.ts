import { createClient } from "redis";
import { logger } from "../logs/logger";
import { randomCacheTime } from "../random-cache-time";

export type RedisClientType = ReturnType<typeof createClient>;

export default class Redis {
  public static redis_instance: Redis;
  redis_client: undefined | RedisClientType;

  private constructor() {
    try {
      const client = createClient({
        socket: {
          connectTimeout: 0,
        },
      });

      client.on("error", (error) => console.error(error));

      client
        .connect()
        .then(() => console.log("Successfully connected to Redis server"));

      this.redis_client = client;
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
    value: any;
    duration_in_seconds?: number;
  }): void {
    if (!this.redis_client) {
      logger.warn("Redis Client: Not available");
      return;
    }

    if (!key || !value) {
      logger.warn("Redis Client: Invalid data to set");
      return;
    }

    const random_cache_time = randomCacheTime({
      seconds: duration_in_seconds,
      extra_minutes: 30,
    });

    this.redis_client
      .set(key, JSON.stringify(value), {
        EX: random_cache_time,
      })
      .then(() => logger.verbose(`Redis Client: Cached data for key: ${key}`))
      .catch((error) =>
        logger.error(`Redis client failed to set data with error: ${error}`)
      );

    return;
  }

  async getData({ key }: { key: string }): Promise<any> {
    if (!this.redis_client) {
      logger.warn("Redis Client: Not available");
      return;
    }

    if (!key) {
      logger.warn("Redis Client: Invalid dataset");
      return;
    }

    try {
      const cached_data = await this.redis_client.get(key);
      if (!!cached_data && typeof cached_data === "string") {
        return JSON.parse(cached_data);
      }

      return null;
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

    if (!key) {
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

  static getInstance() {
    if (!Redis.redis_instance) {
      Redis.redis_instance = new Redis();
    }

    return Redis.redis_instance;
  }

  cacheKeyBuilder(params = {}): string {
    if (!this.redis_client) {
      return null;
    }

    let final_key = "";
    for (const key in params) {
      if (!params[key]) {
        continue;
      }

      final_key += `${key}=${params[key]};`;
    }

    final_key = final_key.slice(0, final_key.length - 1);

    return final_key;
  }
}

const redis = Redis.getInstance();
export { redis };
