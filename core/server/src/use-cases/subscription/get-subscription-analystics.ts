import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
} from "../../data-access/interfaces/subscription-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export interface IGetSubscriptionAnalysticsPayload {
  range?: string[];
  unit?: string;
}

export type GetSubscriptionAnalystics = ({
  range,
  unit,
}: IGetSubscriptionAnalysticsPayload) => Promise<ISubscriptionAnalyticsData>;

export default function makeGetSubscriptionAnalystics({
  subscriptionDb,
  redis,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  redis: Redis;
  logger: Logger;
}): GetSubscriptionAnalystics {
  return async function getSubscriptionAnalystics({ unit, range }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getSubscriptionAnalystics",
      unit,
      range,
    });

    const cached_data = <ISubscriptionAnalyticsData>(
      await redis.getData({ key: cache_key })
    );

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await subscriptionDb.getSubscriptionAnalystics({
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
