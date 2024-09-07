import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IPostDb, {
  IPaginatedPostsResult,
} from "../../data-access/interfaces/post-db";

export interface IGetPostsPaginated {
  categories?: string[];
  tags?: string[];
  sorts?: string;
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetPostsPaginated = ({
  categories,
  tags,
  sorts,
  query,
  page,
  entries_per_page,
}: IGetPostsPaginated) => Promise<IPaginatedPostsResult>;

export default function makeGetPostsPaginated({
  postDb,
  randomCacheTime,
  redis,
  logger,
}: {
  postDb: IPostDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetPostsPaginated {
  return async function getPostsPaginated({
    query,
    page,
    entries_per_page,
    categories = [],
    tags,
    sorts,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getPostsPaginated",
      categories,
      tags,
      sorts,
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData<IPaginatedPostsResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await postDb.findAllPaginated(
      { categories, tags, sorts },
      { query, page, entries_per_page }
    );

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
