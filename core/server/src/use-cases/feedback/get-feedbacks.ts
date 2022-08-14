import { Logger } from "winston";
import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IGetFeedbacks = () => Promise<Feedback[] | null>;

export default function makeGetFeedbacks({
  feedbackDb,
  logger,
}: {
  feedbackDb: IFeedbackDb;
  logger: Logger;
}): IGetFeedbacks {
  return async function getFeedbacks(): Promise<Feedback[] | null> {
    const feedbacks = await feedbackDb.findAll();
    return feedbacks;
  };
}
