import IPostDb, { IPostAnalytics } from "../../data-access/interfaces/post-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetPostAnalystics = ({
  range,
  unit,
}: {
  range?: string[];
  unit?: string;
}) => Promise<IPostAnalytics>;

export default function makeGetPostAnalystics({
  postDb,
  redis,
  logger,
}: {
  postDb: IPostDb;
  redis: Redis;
  logger: Logger;
}): IGetPostAnalystics {
  return async function getPostAnalystics({ unit, range }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getPostAnalystics",
      unit,
      range,
    });

    const cached_data = <IPostAnalytics>await redis.getData({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.getPostAnalystics({ range, unit });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
