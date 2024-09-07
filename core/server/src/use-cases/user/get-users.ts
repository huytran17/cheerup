import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IUserDb from "../../data-access/interfaces/user-db";
import IUser from "../../database/interfaces/user";

export type GetUsers = () => Promise<IUser[]>;

export default function makeGetUsers({
  userDb,
  randomCacheTime,
  redis,
  logger,
}: {
  userDb: IUserDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetUsers {
  return async function getUsers() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getUsers" });

    const cached_data = await redis.getData<IUser[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const users = await userDb.findAll();

    const duration_in_seconds = randomCacheTime({
      seconds: 30 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: users, duration_in_seconds });

    return users;
  };
}
