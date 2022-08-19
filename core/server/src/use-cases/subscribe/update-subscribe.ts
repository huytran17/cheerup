import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface IUpdateSubscriptionData {
  subscriptionDetails: Omit<ISubscription, "_id">;
}

export type IUpdateSubscription = ({
  subscriptionDetails,
}: IUpdateSubscriptionData) => Promise<Subscription | null>;

export default function makeUpdateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IUpdateSubscription {
  return async function updateSubscription({
    subscriptionDetails,
  }: IUpdateSubscriptionData): Promise<Subscription | null> {
    const subscription = await subscriptionDb.update(subscriptionDetails);
    return subscription;
  };
}
