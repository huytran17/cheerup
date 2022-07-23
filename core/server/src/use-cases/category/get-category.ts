import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetCategory = ({
  _id,
}: {
  _id: string;
}) => Promise<Category | null>;

export default function makeGetCategory({
  categoryDb,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  redis: Redis;
  logger: Logger;
}): IGetCategory {
  return async function getCategory({
    _id,
  }: {
    _id: string;
  }): Promise<Category | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-category-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const category = await categoryDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: category,
      duration_in_seconds: one_minute_in_second,
    });
    return category;
  };
}
