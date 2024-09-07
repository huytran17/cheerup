import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export type GetPosts = () => Promise<IPost[]>;

export default function makeGetPosts({
  postDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetPosts {
  return async function getPosts() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getPosts" });

    const cached_data = await redis.getData<IPost[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const posts = await postDb.findAll();

    const duration_in_seconds = randomCacheTime({
      seconds: 30 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: posts, duration_in_seconds });

    return posts;
  };
}
