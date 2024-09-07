import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface ICategoryTitles {
  _id: string;
  title: string;
  slug: string;
}

export type GetCategoryTitles = () => Promise<ICategoryTitles[]>;

export default function makeGetCategoryTitles({
  categoryDb,
  randomCacheTime,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCategoryTitles {
  return async function getCategoryTitles() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getCategoryTitles" });

    const cached_data = await redis.getData<ICategoryTitles[]>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await categoryDb.findAllCategoryTitles();

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
