import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";
import { Logger } from "winston";

export type IGetFeedback = ({
  _id,
}: {
  _id: string;
}) => Promise<Feedback | null>;

export default function makeGetFeedback({
  feedbackDb,
  logger,
}: {
  feedbackDb: IFeedbackDb;
  logger: Logger;
}): IGetFeedback {
  return async function getFeedback({
    _id,
  }: {
    _id: string;
  }): Promise<Feedback | null> {
    const feedback = await feedbackDb.findById({ _id });
    return feedback;
  };
}
