import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetPost = ({ _id }: { _id: string }) => Promise<Post | null>;

export default function makeGetPost({
  postDb,
  redis,
  logger,
}: {
  postDb: IPostDb;
  redis: Redis;
  logger: Logger;
}): IGetPost {
  return async function getPost({
    _id,
  }: {
    _id: string;
  }): Promise<Post | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-post-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const post = await postDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: post,
      duration_in_seconds: one_minute_in_second,
    });
    return post;
  };
}
