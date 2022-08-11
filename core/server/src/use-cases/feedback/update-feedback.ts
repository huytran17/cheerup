import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";
import IFeedback from "../../database/interfaces/feedback";

export interface IUpdateFeedbackData {
  feedbackDetails: Omit<IFeedback, "_id">;
}

export type IUpdateFeedback = ({
  feedbackDetails,
}: IUpdateFeedbackData) => Promise<Feedback | null>;

export default function makeUpdateFeedback({
  feedbackDb,
}: {
  feedbackDb: IFeedbackDb;
}): IUpdateFeedback {
  return async function updateFeedback({
    feedbackDetails,
  }: IUpdateFeedbackData): Promise<Feedback | null> {
    const feedback = await feedbackDb.update(feedbackDetails);
    return feedback;
  };
}
