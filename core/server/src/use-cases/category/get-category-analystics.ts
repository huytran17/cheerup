import ICategoryDb, {
  ICategoryAnalyticsData,
} from "../../data-access/interfaces/category-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export interface IGetCategoryAnalysticsPayload {
  range?: string[];
  unit?: string;
  limit?: number;
}

export type GetCategoryAnalystics = ({
  range,
  unit,
  limit,
}: IGetCategoryAnalysticsPayload) => Promise<ICategoryAnalyticsData>;

export default function makeGetCategoryAnalystics({
  categoryDb,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  redis: Redis;
  logger: Logger;
}): GetCategoryAnalystics {
  return async function getCategoryAnalystics({ unit, range, limit }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCategoryAnalystics",
      unit,
      range,
    });

    const cached_data = <ICategoryAnalyticsData>(
      await redis.getData({ key: cache_key })
    );

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await categoryDb.getCategoryAnalystics({ range, unit, limit });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
