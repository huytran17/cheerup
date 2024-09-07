import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IUserDb, {
  IUserAnalyticsData,
} from "../../data-access/interfaces/user-db";

export interface IGetUserAnalystics {
  range?: string[];
  unit?: string;
}

export type GetUserAnalystics = ({
  range,
  unit,
}: IGetUserAnalystics) => Promise<IUserAnalyticsData>;

export default function makeGetUserAnalystics({
  userDb,
  randomCacheTime,
  redis,
  logger,
}: {
  userDb: IUserDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetUserAnalystics {
  return async function getUserAnalystics({ unit, range }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getUserAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData<IUserAnalyticsData>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await userDb.getUserAnalystics({
      range,
      unit,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 24 * 60 * 60,
      extra_minutes: 10,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
