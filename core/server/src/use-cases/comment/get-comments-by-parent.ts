import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IGetCommentsByParentPayload {
  _id: string;
}

export type GetCommentsByParent = ({
  _id,
}: IGetCommentsByParentPayload) => Promise<IComment[]>;

export default function makeGetCommentsByParent({
  commentDb,
  randomCacheTime,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCommentsByParent {
  return async function getCommentsByParent({ _id }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCommentsByParent",
      _id,
    });

    const cached_data = await redis.getData<IComment[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const comments = await commentDb.findAllByParent({ _id });

    const duration_in_seconds = randomCacheTime({
      seconds: 5 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: comments, duration_in_seconds });

    return comments;
  };
}
