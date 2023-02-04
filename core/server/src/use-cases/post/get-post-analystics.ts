import IPostDb, {
  IPostAnalyticsData,
} from "../../data-access/interfaces/post-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetPostAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IPostAnalyticsData>;

export default function makeGetPostAnalystics({
  postDb,
  redis,
  logger,
}: {
  postDb: IPostDb;
  redis: Redis;
  logger: Logger;
}): IGetPostAnalystics {
  return async function getPostAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<IPostAnalyticsData> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getPostAnalystics",
      unit,
      distance,
    });

    const cached_data = await redis.getData({ key: cache_key });
    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.getPostAnalystics({ distance, unit });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
