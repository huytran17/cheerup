import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICategoryDb, {
  ICategoryAnalyticsData,
} from "../../data-access/interfaces/category-db";

export interface IGetCategoryAnalystics {
  range?: string[];
  unit?: string;
  limit?: number;
}

export type GetCategoryAnalystics = ({
  range,
  unit,
  limit,
}: IGetCategoryAnalystics) => Promise<ICategoryAnalyticsData>;

export default function makeGetCategoryAnalystics({
  categoryDb,
  randomCacheTime,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCategoryAnalystics {
  return async function getCategoryAnalystics({ unit, range, limit }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCategoryAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData<ICategoryAnalyticsData>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await categoryDb.getCategoryAnalystics({ range, unit, limit });

    const duration_in_seconds = randomCacheTime({
      seconds: 24 * 60 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
