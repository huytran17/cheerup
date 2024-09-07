import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IAdminDb from "../../data-access/interfaces/admin-db";
import IAdmin from "../../database/interfaces/admin";

export type GetAdmins = () => Promise<IAdmin[]>;

export default function makeGetAdmins({
  adminDb,
  randomCacheTime,
  redis,
  logger,
}: {
  adminDb: IAdminDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetAdmins {
  return async function getAdmins() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getAdmins" });

    const cached_data = await redis.getData<IAdmin[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const admins = await adminDb.findAll();

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 12,
    });

    redis.setData({ key: cache_key, value: admins, duration_in_seconds });

    return admins;
  };
}
