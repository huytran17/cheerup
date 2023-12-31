import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type IGetSubscription = ({
  _id,
}: {
  _id: string;
}) => Promise<Subscription>;

export default function makeGetSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetSubscription {
  return async function getSubscription({ _id }) {
    return await subscriptionDb.findById({ _id });
  };
}
