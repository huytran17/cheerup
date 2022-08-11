import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";
import IFeedback from "../../database/interfaces/feedback";

export interface ICreateFeedbackData {
  feedbackDetails: Omit<IFeedback, "_id">;
}

export type ICreateFeedback = ({
  feedbackDetails,
}: ICreateFeedbackData) => Promise<Feedback | null>;

export default function makeCreateFeedback({
  feedbackDb,
}: {
  feedbackDb: IFeedbackDb;
}): ICreateFeedback {
  return async function createFeedback({
    feedbackDetails,
  }: ICreateFeedbackData): Promise<Feedback | null> {
    const feedback = await feedbackDb.insert(feedbackDetails);
    return feedback;
  };
}
