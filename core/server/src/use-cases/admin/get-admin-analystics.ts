import IAdminDb, {
  IAdminAnalyticsData,
} from "../../data-access/interfaces/admin-db";
import Redis from "../../config/redis";
import { Logger } from "winston";
import { AdminType } from "../../database/interfaces/admin";

export interface IGetAdminAnalysticsPayload {
  range?: string[];
  unit?: string;
  author_type?: AdminType;
}

export type GetAdminAnalystics = ({
  range,
  unit,
  author_type,
}: IGetAdminAnalysticsPayload) => Promise<IAdminAnalyticsData>;

export default function makeGetAdminAnalystics({
  adminDb,
  redis,
  logger,
}: {
  adminDb: IAdminDb;
  redis: Redis;
  logger: Logger;
}): GetAdminAnalystics {
  return async function getAdminAnalystics({ unit, range, author_type }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getAdminAnalystics",
      unit,
      author_type,
      range,
    });

    const cached_data = <IAdminAnalyticsData>(
      await redis.getData({ key: cache_key })
    );

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await adminDb.getAdminAnalystics({ range, unit, author_type });

    const one_day_in_seconds = 24 * 60 * 60;
    redis.setData({
      key: cache_key,
      value: data,
      duration_in_seconds: one_day_in_seconds,
    });

    return data;
  };
}
