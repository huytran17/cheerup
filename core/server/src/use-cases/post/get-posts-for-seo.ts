import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export type GetPostsForSEO = () => Promise<IPost[]>;

export default function makeGetPostsForSEO({
  postDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetPostsForSEO {
  return async function getPostsForSEO() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getPostsForSEO" });

    const cached_data = await redis.getData<IPost[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const posts = await postDb.findAllForSEO();

    const duration_in_seconds = randomCacheTime({
      seconds: 15 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: posts, duration_in_seconds });

    return posts;
  };
}
