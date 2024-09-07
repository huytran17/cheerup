import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb, {
  IMostPopularPostsAnalytics,
} from "../../data-access/interfaces/post-db";

export interface IGetMostPopularPostsAnalystics {
  range?: string[];
  unit?: string;
  limit?: number;
}

export type GetMostPopularPostsAnalystics = ({
  range,
  unit,
  limit,
}: IGetMostPopularPostsAnalystics) => Promise<IMostPopularPostsAnalytics>;

export default function makeGetMostPopularPostsAnalystics({
  postDb,
  randomCacheTime,
  logger,
  redis,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  logger: Logger;
  redis: Redis;
}): GetMostPopularPostsAnalystics {
  return async function getMostPopularPostsAnalystics({ range, unit, limit }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getMostPopularPostsAnalystics",
      range,
      unit,
      limit,
    });

    const cached_data = await redis.getData<IMostPopularPostsAnalytics>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const posts = await postDb.getMostPopularPostsAnalystics({
      range,
      unit,
      limit,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 30 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: posts, duration_in_seconds });

    return posts;
  };
}
