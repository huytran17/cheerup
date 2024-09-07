import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IAdminDb, {
  IPaginatedAdminsResult,
} from "../../data-access/interfaces/admin-db";

export interface IGetAdminsPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetAdminsPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetAdminsPaginated) => Promise<IPaginatedAdminsResult>;

export default function makeGetAdminsPaginated({
  adminDb,
  randomCacheTime,
  redis,
  logger,
}: {
  adminDb: IAdminDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetAdminsPaginated {
  return async function getAdminsPaginated({ query, page, entries_per_page }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getAdminsPaginated",
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData<IPaginatedAdminsResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const admins = await adminDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 60 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: admins, duration_in_seconds });

    return admins;
  };
}
