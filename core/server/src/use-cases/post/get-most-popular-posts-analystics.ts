import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import { Logger } from "winston";
import Redis from "../../config/redis";

export type IGetMostPopularPostsAnalystics = ({
  range,
  unit,
  limit,
}: {
  range?: string[];
  unit?: string;
  limit?: number;
}) => Promise<Post[] | null>;

export default function makeGetMostPopularPostsAnalystics({
  postDb,
  logger,
  redis,
}: {
  postDb: IPostDb;
  logger: Logger;
  redis: Redis;
}): IGetMostPopularPostsAnalystics {
  return async function getMostPopularPostsAnalystics({
    range,
    unit,
    limit,
  }: {
    range?: string[];
    unit?: string;
    limit?: number;
  }): Promise<Post[] | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getMostPopularPostsAnalystics",
      range,
      unit,
      limit,
    });

    const cached_data = await redis.getData({ key: cache_key });
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
