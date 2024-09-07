import { isNumber } from "lodash";
import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICommentDb from "../../data-access/interfaces/comment-db";

export interface ICountCommentsByPost {
  post_id: string;
}

export type CountCommentsByPost = ({
  post_id,
}: ICountCommentsByPost) => Promise<number>;

export default function makeCountCommentsByPost({
  commentDb,
  randomCacheTime,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): CountCommentsByPost {
  return async function countCommentsByPost({ post_id }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "countCommentsByPost",
      post_id,
    });

    const cached_data = await redis.getData<number>({ key: cache_key });

    if (isNumber(cached_data)) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await commentDb.countByPost({ post_id });

    const duration_in_seconds = randomCacheTime({
      seconds: 5 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
