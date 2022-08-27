import IFeedbackDb, {
  IFeedbackAnalyticsData,
} from "../../data-access/interfaces/feedback-db";

export type IGetFeedbackAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<IFeedbackAnalyticsData>;

export default function makeGetFeedbackAnalystics({
  feedbackDb,
}: {
  feedbackDb: IFeedbackDb;
}): IGetFeedbackAnalystics {
  return async function getFeedbackAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<IFeedbackAnalyticsData> {
    const data = await feedbackDb.getFeedbackAnalystics({ distance, unit });
    return data;
  };
}
