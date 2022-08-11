import Feedback from "../../database/entities/feedback";
import IFeedbackDb from "../../data-access/interfaces/feedback-db";

export type IDeleteFeedback = ({
  _id,
}: {
  _id: string;
}) => Promise<Feedback | null>;

export default function makeDeleteFeedback({
  feedbackDb,
}: {
  feedbackDb: IFeedbackDb;
}): IDeleteFeedback {
  return async function deleteFeedback({
    _id,
  }: {
    _id: string;
  }): Promise<Feedback | null> {
    const feedback = await feedbackDb.delete({ _id });
    return feedback;
  };
}
