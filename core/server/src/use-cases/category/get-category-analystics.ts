import ICategoryDb, {
  ICategoryAnalyticsData,
} from "../../data-access/interfaces/category-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetCategoryAnalystics = ({
  range,
  unit,
}: {
  range?: string[];
  unit?: string;
}) => Promise<ICategoryAnalyticsData>;

export default function makeGetCategoryAnalystics({
  categoryDb,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  redis: Redis;
  logger: Logger;
}): IGetCategoryAnalystics {
  return async function getCategoryAnalystics({
    unit,
    range,
  }: {
    unit?: string;
    range?: string[];
  }): Promise<ICategoryAnalyticsData> {
    // const cache_key = redis.cacheKeyBuilder({
    //   prefix: "getCategoryAnalystics",
    //   unit,
    //   range,
    // });

    // const cached_data = await redis.getData({ key: cache_key });
    // if (cached_data) {
    //   logger.verbose("Redis: Data found in cache", { cache_key });
    //   return cached_data;
    // }

    const data = await categoryDb.getCategoryAnalystics({ range, unit });

    // const one_day_in_seconds = 24 * 60 * 60;
    // redis.setData({
    //   key: cache_key,
    //   value: data,
    //   duration_in_seconds: one_day_in_seconds,
    // });

    return data;
  };
}
