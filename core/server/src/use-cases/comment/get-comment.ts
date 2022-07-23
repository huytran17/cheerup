import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetComment = ({ _id }: { _id: string }) => Promise<Comment | null>;

export default function makeGetComment({
  commentDb,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  redis: Redis;
  logger: Logger;
}): IGetComment {
  return async function getComment({
    _id,
  }: {
    _id: string;
  }): Promise<Comment | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-comment-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const comment = await commentDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: comment,
      duration_in_seconds: one_minute_in_second,
    });
    return comment;
  };
}
