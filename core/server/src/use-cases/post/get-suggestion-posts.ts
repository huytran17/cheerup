import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IGetSuggestionPosts {
  amount: number;
  categories: string[];
  exclude_ids?: string[];
}

export type GetSuggestionPosts = ({
  amount,
  categories,
  exclude_ids,
}: IGetSuggestionPosts) => Promise<IPost[]>;

export default function makeGetSuggestionPosts({
  postDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetSuggestionPosts {
  return async function getSuggestionPosts({
    amount,
    categories,
    exclude_ids,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getSuggestionPosts",
      amount,
      categories,
      exclude_ids,
    });

    const cached_data = await redis.getData<IPost[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.findSuggestionPosts({
      amount,
      categories,
      exclude_ids,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
