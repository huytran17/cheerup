import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type GetComments = () => Promise<IComment[]>;

export default function makeGetComments({
  commentDb,
  randomCacheTime,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetComments {
  return async function getComments() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getComments" });

    const cached_data = await redis.getData<IComment[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const comments = await commentDb.findAll();

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: comments, duration_in_seconds });

    return comments;
  };
}
