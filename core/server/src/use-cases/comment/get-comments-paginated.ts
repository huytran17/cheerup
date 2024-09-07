import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICommentDb, {
  IPaginatedCommentsResult,
} from "../../data-access/interfaces/comment-db";

export interface IGetCommentsPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetCommentsPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetCommentsPaginated) => Promise<IPaginatedCommentsResult>;

export default function makeGetCommentsPaginated({
  commentDb,
  randomCacheTime,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCommentsPaginated {
  return async function getCommentsPaginated({
    query,
    page,
    entries_per_page,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCommentsPaginated",
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData<IPaginatedCommentsResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await commentDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 5 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
