import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import IGalleryDb, {
  IPaginatedGalleriesResult,
} from "../../data-access/interfaces/gallery-db";

export interface IGetGalleriesPaginated {
  query: string;
  page: number;
  entries_per_page: number;
  is_parent?: boolean;
}

export type GetGalleriesPaginated = ({
  query,
  page,
  entries_per_page,
  is_parent,
}: IGetGalleriesPaginated) => Promise<IPaginatedGalleriesResult>;

export default function makeGetGalleriesPaginated({
  galleryDb,
  randomCacheTime,
  logger,
  redis,
}: {
  galleryDb: IGalleryDb;
  randomCacheTime: RandomCacheTime;
  logger: Logger;
  redis: Redis;
}): GetGalleriesPaginated {
  return async function getGalleriesPaginated({
    query,
    page,
    entries_per_page,
    is_parent,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getGalleriesPaginated",
      query,
      page,
      entries_per_page,
      is_parent,
    });

    const cached_data = await redis.getData<IPaginatedGalleriesResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await galleryDb.findAllPaginated(
      { query, page, entries_per_page },
      { is_parent }
    );

    const duration_in_seconds = randomCacheTime({
      seconds: 10 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
