import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export type GetCategoriesForSEO = () => Promise<ICategory[]>;

export default function makeGetCategoriesForSEO({
  categoryDb,
  randomCacheTime,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCategoriesForSEO {
  return async function getCategoriesForSEO() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getCategoriesForSEO" });

    const cached_data = await redis.getData<ICategory[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const categories = await categoryDb.findAllForSEO();

    const duration_in_seconds = randomCacheTime({
      seconds: 15 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: categories, duration_in_seconds });

    return categories;
  };
}
