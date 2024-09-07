import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICategoryDb, {
  IPaginatedCategoriesResult,
} from "../../data-access/interfaces/category-db";

export interface IGetCategoriesPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetCategoriesPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetCategoriesPaginated) => Promise<IPaginatedCategoriesResult>;

export default function makeGetCategoriesPaginated({
  categoryDb,
  randomCacheTime,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCategoriesPaginated {
  return async function getCategoriesPaginated({
    query,
    page,
    entries_per_page,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCategoriesPaginated",
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData<IPaginatedCategoriesResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await categoryDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
