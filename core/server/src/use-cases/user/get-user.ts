import User from "../../database/entities/user";
import IUserDb from "../../data-access/interfaces/user-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetUser = ({ _id }: { _id: string }) => Promise<User | null>;

export default function makeGetUser({
  userDb,
  redis,
  logger,
}: {
  userDb: IUserDb;
  redis: Redis;
  logger: Logger;
}): IGetUser {
  return async function getUser({
    _id,
  }: {
    _id: string;
  }): Promise<User | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-user-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const user = await userDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: user,
      duration_in_seconds: one_minute_in_second,
    });
    return user;
  };
}
