import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IUserDb, {
  IPaginatedUsersResult,
} from "../../data-access/interfaces/user-db";

export interface IGetUsersPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetUsersPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetUsersPaginated) => Promise<IPaginatedUsersResult>;

export default function makeGetUsersPaginated({
  userDb,
  randomCacheTime,
  redis,
  logger,
}: {
  userDb: IUserDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetUsersPaginated {
  return async function getUsersPaginated({ query, page, entries_per_page }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getUsersPaginated",
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData<IPaginatedUsersResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const users = await userDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 60 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: users, duration_in_seconds });

    return users;
  };
}
