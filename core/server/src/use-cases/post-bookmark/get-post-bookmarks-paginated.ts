import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostBookmarkDb, {
  IPaginatedPostBookmarksResult,
} from "../../data-access/interfaces/post-bookmark-db";

export interface IGetPostBookmarksPaginated {
  query: string;
  page: number;
  entries_per_page: number;
  user_id?: string;
}

export type GetPostBookmarksPaginated = ({
  query,
  page,
  entries_per_page,
  user_id,
}: IGetPostBookmarksPaginated) => Promise<IPaginatedPostBookmarksResult>;

export default function makeGetPostBookmarksPaginated({
  postBookmarkDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postBookmarkDb: IPostBookmarkDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetPostBookmarksPaginated {
  return async function getPostBookmarksPaginated({
    query,
    page,
    entries_per_page,
    user_id,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getPostBookmarksPaginated",
      query,
      page,
      entries_per_page,
      user_id,
    });

    const cached_data = await redis.getData<IPaginatedPostBookmarksResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postBookmarkDb.findAllPaginated({
      query,
      page,
      entries_per_page,
      user_id,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 5 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
