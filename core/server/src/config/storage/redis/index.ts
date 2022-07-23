import { createClient } from "redis";

export type RedisClientType = ReturnType<typeof createClient>;

export default class Redis {
  public static redis_instance: Redis;
  redis_client: undefined | RedisClientType;
  static key_list: Record<string, string[]>;
  constructor() {
    if (Redis.redis_instance) {
      return Redis.redis_instance;
    }

    const REDIS_URL = process.env.REDIS_URL || "";
    if (!REDIS_URL) {
      console.warn("Redis URL not found. Redis is not established");
      Redis.redis_instance = this;
      return;
    }

    const client = createClient({ url: REDIS_URL });
    client.on("error", (err) => console.error("Redis Client Error", err));
    client.connect().then(() => {
      console.log("Successfully connected to Redis");
    });
    this.redis_client = client;
    Redis.redis_instance = this;
    Redis.key_list = {};
    return Redis.redis_instance;
  }

  static getRedis(): Redis {
    if (Redis.redis_instance) {
      return Redis.redis_instance;
    }

    new Redis();
    return Redis.redis_instance;
  }

  setData({
    key,
    value,
    duration_in_seconds = 30,
    key_entity,
  }: {
    key: string;
    value: any;
    duration_in_seconds?: number;
    key_entity?: string;
  }): void {
    if (!this.redis_client) {
      return;
    }

    const invalid_value = !value;
    if (invalid_value) {
      return;
    }

    this.redis_client
      .set(key, JSON.stringify(value), {
        EX: duration_in_seconds,
      })
      .catch((err) => {
        console.error(err);
      });

    if (key_entity) {
      this.setKeyListData({ key_entity, key });
    }
  }

  /**
   * @param param0 append the key to key_list[key_entity]
   */
  setKeyListData({
    key_entity,
    key,
  }: {
    key_entity: string;
    key: string;
  }): void {
    if (!Redis.key_list) {
      Redis.key_list = {};
    }

    if (!Redis.key_list[key_entity]) {
      Redis.key_list[key_entity] = [];
    }

    Redis.key_list[key_entity].push(key);
  }

  async getData(key: string): Promise<any> {
    if (!this.redis_client || !key) {
      return null;
    }
    try {
      const cached_data = await this.redis_client.get(key);
      if (!!cached_data && typeof cached_data === "string") {
        return JSON.parse(cached_data);
      }
      return null;
    } catch (err) {
      console.error(
        `Encountered error in Redis for key: ${key}, catch, delete key and returning null`
      );
      this.deleteData({ key });
      return null;
    }
  }

  /**
   *
   * @param param0 delete data if needed. Currently not used, because the cache is just updated instead
   * unlink is more efficient than del O(1) vs O(n)
   * @returns
   */
  async deleteData({ key }: { key: string }): Promise<null | string> {
    if (!this.redis_client || !key) {
      return null;
    }

    await this.redis_client.unlink(key);
    return key;
  }

  /**
   * @param param0 delete data by key_entity (e.g. job, form, user)
   * @returns
   */
  async deleteDataByEntity({
    key_entity,
  }: {
    key_entity: string;
  }): Promise<void> {
    if (!this.redis_client || !key_entity) {
      return;
    }

    if (Redis.key_list && Redis.key_list[key_entity]) {
      await this.redis_client.unlink(Redis.key_list[key_entity]);
      Redis.key_list[key_entity] = [];
    }
  }

  /**
   * @description concat parameters into a string to used as cache key
   * @param params
   * @returns cache key
   */
  cacheKeyBuilder(params = {}): string {
    if (!this.redis_client) {
      return null;
    }

    const key_array = [];
    for (const key in params) {
      const value = params[key];
      if (!value) {
        continue;
      }
      key_array.push(`${key}=${params[key]}`);
    }
    return key_array.join("&");
  }
}

const redis = Redis.getRedis();
export { redis };
