import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export type GetSubscriptions = () => Promise<ISubscription[]>;

export default function makeGetSubscriptions({
  subscriptionDb,
  randomCacheTime,
  redis,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetSubscriptions {
  return async function getSubscriptions() {
    const cache_key = redis.cacheKeyBuilder({ prefix: "getSubscriptions" });

    const cached_data = await redis.getData<ISubscription[]>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await subscriptionDb.findAll();

    const duration_in_seconds = randomCacheTime({
      seconds: 15 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
