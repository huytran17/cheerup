import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbacks = () => Promise<Feedback[] | null>;

export default function makeGetFeedbacks({
  feedbackDb,
  redis,
  logger,
}: {
  feedbackDb: IFeedbackDb;
  redis: Redis;
  logger: Logger;
}): IGetFeedbacks {
  return async function getFeedbacks(): Promise<Feedback[] | null> {
    const feedbacks = await feedbackDb.findAll();
    return feedbacks;
  };
}
