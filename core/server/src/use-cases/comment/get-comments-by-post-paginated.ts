import { Logger } from "winston";
import { RandomCacheTime } from "../../config/random-cache-time/make-random-cache-time";
import Redis from "../../config/redis";
import ICommentDb, {
  IPaginatedCommentsResult,
} from "../../data-access/interfaces/comment-db";

export interface IGetCommentsByPostPaginatedPayload {
  query: string;
  page: number;
  entries_per_page: number;
  post_id: string;
}

export type GetCommentsByPostPaginated = ({
  post_id,
  query,
  page,
  entries_per_page,
}: IGetCommentsByPostPaginatedPayload) => Promise<IPaginatedCommentsResult>;

export default function makeGetCommentsByPostPaginated({
  commentDb,
  randomCacheTime,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  randomCacheTime: RandomCacheTime;
  redis: Redis;
  logger: Logger;
}): GetCommentsByPostPaginated {
  return async function getCommentsByPostPaginated({
    query,
    page,
    entries_per_page,
    post_id,
  }) {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "getCommentsByPostPaginated",
      query,
      page,
      entries_per_page,
      post_id,
    });

    const cached_data = await redis.getData<IPaginatedCommentsResult>({
      key: cache_key,
    });

    if (cached_data) {
      logger.verbose("Redis: Data found in cache", { cache_key });
      return cached_data;
    }

    const data = await commentDb.findAllByPostPaginated(
      { post_id },
      { query, page, entries_per_page }
    );

    const duration_in_seconds = randomCacheTime({
      seconds: 5 * 60,
      extra_minutes: 5,
    });

    redis.setData({ key: cache_key, value: data, duration_in_seconds });

    return data;
  };
}
