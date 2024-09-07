import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb, { IPostAnalytics } from "../../data-access/interfaces/post-db";

export interface IGetPostAnalysticsPayload {
  range?: string[];
  unit?: string;
  limit?: number;
}

export type GetPostAnalystics = ({
  range,
  unit,
}: IGetPostAnalysticsPayload) => Promise<IPostAnalytics>;

export default function makeGetPostAnalystics({
  postDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetPostAnalystics {
  return async function getPostAnalystics({ unit, range }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getPostAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData<IPostAnalytics>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.getPostAnalystics({ range, unit });

    const duration_in_seconds = randomCacheTime({
      seconds: 24 * 60 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
