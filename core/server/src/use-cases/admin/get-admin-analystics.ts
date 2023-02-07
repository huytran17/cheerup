import IAdminDb, {
  IAdminAnalyticsData,
} from "../../data-access/interfaces/admin-db";
import Redis from "../../config/redis";
import { Logger } from "winston";

export type IGetAdminAnalystics = ({
  range,
  unit,
}: {
  range?: string[];
  unit?: string;
}) => Promise<IAdminAnalyticsData>;

export default function makeGetAdminAnalystics({
  adminDb,
  redis,
  logger,
}: {
  adminDb: IAdminDb;
  redis: Redis;
  logger: Logger;
}): IGetAdminAnalystics {
  return async function getAdminAnalystics({
    unit,
    range,
  }: {
    unit?: string;
    range?: string[];
  }): Promise<IAdminAnalyticsData> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getAdminAnalystics",
      unit,
      range,
    });

    const cached_data = await redis.getData({ key: cache_key });
    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await adminDb.getAdminAnalystics({ range, unit });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
