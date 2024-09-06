import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ISubscriptionDb, {
  IPaginatedSubscriptionsResult,
} from "../../data-access/interfaces/subscription-db";

export interface IGetSubscriptionsPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetSubscriptionsPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetSubscriptionsPaginated) => Promise<IPaginatedSubscriptionsResult>;

export default function makeGetSubscriptionsPaginated({
  subscriptionDb,
  randomCacheTime,
  redis,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetSubscriptionsPaginated {
  return async function getSubscriptionsPaginated({
    query,
    page,
    entries_per_page,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getSubscriptionPaginated",
      query,
      page,
      entries_per_page,
    });

    const cached_data = await redis.getData({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await subscriptionDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds,
    });

    return data;
  };
}
