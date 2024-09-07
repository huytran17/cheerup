import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
} from "../../data-access/interfaces/subscription-db";

export interface IGetSubscriptionAnalystics {
  range?: string[];
  unit?: string;
}

export type GetSubscriptionAnalystics = ({
  range,
  unit,
}: IGetSubscriptionAnalystics) => Promise<ISubscriptionAnalyticsData>;

export default function makeGetSubscriptionAnalystics({
  subscriptionDb,
  randomCacheTime,
  redis,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetSubscriptionAnalystics {
  return async function getSubscriptionAnalystics({ unit, range }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getSubscriptionAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData<ISubscriptionAnalyticsData>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await subscriptionDb.getSubscriptionAnalystics({
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
