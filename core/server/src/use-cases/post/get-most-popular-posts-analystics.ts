import IPostDb, {
  IMostPopularPostsAnalytics,
} from "../../data-access/interfaces/post-db";
import { Logger } from "winston";
import Redis from "../../config/redis";

export interface IGetMostPopularPostsAnalysticsPayload {
  range?: string[];
  unit?: string;
  limit?: number;
}

export type GetMostPopularPostsAnalystics = ({
  range,
  unit,
  limit,
}: IGetMostPopularPostsAnalysticsPayload) => Promise<IMostPopularPostsAnalytics>;

export default function makeGetMostPopularPostsAnalystics({
  postDb,
  logger,
  redis,
}: {
  postDb: IPostDb;
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

    const cached_data = <IMostPopularPostsAnalytics>(
      await redis.getData({ key: cache_key })
    );

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const posts = await postDb.getMostPopularPostsAnalystics({
      range,
      unit,
      limit,
    });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: posts,
      duration_in_seconds: one_day_in_seconds,
    });

    return posts;
  };
}
