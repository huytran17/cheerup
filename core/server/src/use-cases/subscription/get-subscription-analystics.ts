import ISubscriptionDb, {
  ISubscriptionAnalyticsData,
} from "../../data-access/interfaces/subscription-db";

export type IGetSubscriptionAnalystics = ({
  distance,
  unit,
}: {
  distance?: number;
  unit?: string;
}) => Promise<ISubscriptionAnalyticsData>;

export default function makeGetSubscriptionAnalystics({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetSubscriptionAnalystics {
  return async function getSubscriptionAnalystics({
    unit,
    distance,
  }: {
    unit?: string;
    distance?: number;
  }): Promise<ISubscriptionAnalyticsData> {
    const data = await subscriptionDb.getSubscriptionAnalystics({
      distance,
      unit,
    });
    return data;
  };
}
