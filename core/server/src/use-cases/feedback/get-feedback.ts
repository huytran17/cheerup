import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";
import Redis from "../../config/storage/redis";
import { Logger } from "winston";

export type IGetFeedback = ({
  _id,
}: {
  _id: string;
}) => Promise<Feedback | null>;

export default function makeGetFeedback({
  feedbackDb,
  redis,
  logger,
}: {
  feedbackDb: IFeedbackDb;
  redis: Redis;
  logger: Logger;
}): IGetFeedback {
  return async function getFeedback({
    _id,
  }: {
    _id: string;
  }): Promise<Feedback | null> {
    const cache_key = redis.cacheKeyBuilder({
      prefix: "get-feedback-by-id",
      _id,
    });
    const cached_data = await redis.getData(cache_key);
    if (cached_data) {
      logger.verbose(`Redis: Data found in cache: `, { cache_key });
      return cached_data;
    }

    const feedback = await feedbackDb.findById({ _id });
    const one_minute_in_second = 60;
    redis.setData({
      key: cache_key,
      value: feedback,
      duration_in_seconds: one_minute_in_second,
    });
    return feedback;
  };
}
