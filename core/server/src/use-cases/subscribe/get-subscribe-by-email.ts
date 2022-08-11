import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetSubscribeByEmail = ({
  email,
}: {
  email: string;
}) => Promise<Subscribe | null>;

export default function makeGetSubscribeByEmail({
  subscribeDb,
  redis,
  logger,
}: {
  subscribeDb: ISubscribeDb;
  redis: Redis;
  logger: Logger;
}): IGetSubscribeByEmail {
  return async function getSubscribeByEmail({
    email,
  }: {
    email: string;
  }): Promise<Subscribe | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-subscribe-by-id",
      email,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const subscribe = await subscribeDb.findByEmail({ email });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: subscribe,
      duration_in_seconds: one_minute_in_second,
    });
    return subscribe;
  };
}
