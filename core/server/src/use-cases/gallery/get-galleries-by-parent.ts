import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IGalleryDb from "../../data-access/interfaces/gallery-db";
import IGallery from "../../database/interfaces/gallery";

export interface IGetGalleriesByParent {
  parent_id: string;
}

export type GetGalleriesByParent = ({
  parent_id,
}: IGetGalleriesByParent) => Promise<IGallery[]>;

export default function makeGetGalleriesByParent({
  galleryDb,
  randomCacheTime,
  logger,
  redis,
}: {
  galleryDb: IGalleryDb;
  randomCacheTime: RandomCacheTime;
  logger: Logger;
  redis: Redis;
}): GetGalleriesByParent {
  return async function getGalleriesByParent({ parent_id }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getGalleriesByParent",
      parent_id,
    });

    const cached_data = await redis.getData<IGallery[]>({ key: cache_key });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const galleries = await galleryDb.findAllByParent({ parent_id });

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: galleries, duration_in_seconds });

    return galleries;
  };
}
