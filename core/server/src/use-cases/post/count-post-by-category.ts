import { isNumber } from "lodash";
import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb from "../../data-access/interfaces/post-db";

export interface ICountPostByCategory {
  category_id: string;
}

export type CountPostByCategory = ({
  category_id,
}: ICountPostByCategory) => Promise<number>;

export default function makeCountPostByCategory({
  postDb,
  randomCacheTime,
  logger,
  redis,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  logger: Logger;
  redis: Redis;
}): CountPostByCategory {
  return async function countPostByCategory({ category_id }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "countPostByCategory",
      category_id,
    });

    const cached_data = await redis.getData<number>({ key: cache_key });

    if (isNumber(cached_data)) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.countByCategory({ category_id });

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
