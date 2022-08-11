import SystemConfiguration from "../../database/entities/system-configuration";
import ISystemConfigurationDb from "../../data-access/interfaces/system-configuration-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetSystemConfiguration = ({
  _id,
}: {
  _id: string;
}) => Promise<SystemConfiguration | null>;

export default function makeGetSystemConfiguration({
  systemConfigurationDb,
  redis,
  logger,
}: {
  systemConfigurationDb: ISystemConfigurationDb;
  redis: Redis;
  logger: Logger;
}): IGetSystemConfiguration {
  return async function getSystemConfiguration({
    _id,
  }: {
    _id: string;
  }): Promise<SystemConfiguration | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-system-configuration-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const system_configuration = await systemConfigurationDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: system_configuration,
      duration_in_seconds: one_minute_in_second,
    });
    return system_configuration;
  };
}
