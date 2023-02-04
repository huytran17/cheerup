import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
} from "../../data-access/interfaces/subscription-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetSubscriptionAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<ISubscriptionAnalyticsData>;

export default function makeGetSubscriptionAnalystics({
  subscriptionDb,
  redis,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  redis: Redis;
  logger: Logger;
}): IGetSubscriptionAnalystics {
  return async function getSubscriptionAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<ISubscriptionAnalyticsData> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getSubscriptionAnalystics",
      unit,
      distance,
    });

    const cached_data = await redis.getData({ key: cache_key });
    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await subscriptionDb.getSubscriptionAnalystics({
      distance,
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
