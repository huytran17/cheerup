import IUserDb, {
  IUserAnalyticsData,
} from "../../data-access/interfaces/user-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetUserAnalystics = ({
  range,
  unit,
}: {
  range?: string[];
  unit?: string;
}) => Promise<IUserAnalyticsData>;

export default function makeGetUserAnalystics({
  userDb,
  redis,
  logger,
}: {
  userDb: IUserDb;
  redis: Redis;
  logger: Logger;
}): IGetUserAnalystics {
  return async function getUserAnalystics({
    unit,
    range,
  }): Promise<IUserAnalyticsData> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getUserAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData({ key: cache_key });
    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await userDb.getUserAnalystics({
      range,
      unit,
    });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
