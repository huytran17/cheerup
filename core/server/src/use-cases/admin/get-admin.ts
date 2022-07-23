import Admin from "../../database/entities/admin";
import IAdminDb from "../../data-access/interfaces/admin-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetAdmin = ({ _id }: { _id: string }) => Promise<Admin | null>;

export default function makeGetAdmin({
  adminDb,
  redis,
  logger,
}: {
  adminDb: IAdminDb;
  redis: Redis;
  logger: Logger;
}): IGetAdmin {
  return async function getAdmin({
    _id,
  }: {
    _id: string;
  }): Promise<Admin | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-admin-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const admin = await adminDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: admin,
      duration_in_seconds: one_minute_in_second,
    });
    return admin;
  };
}
