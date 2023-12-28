import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface ICreateSubscriptionData {
  subscriptionDetails: Omit<ISubscription, "_id">;
}

export type ICreateSubscription = ({
  subscriptionDetails,
}: ICreateSubscriptionData) => Promise<Subscription | null>;

export default function makeCreateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): ICreateSubscription {
  return async function createSubscription({ subscriptionDetails }) {
    return await subscriptionDb.insert(subscriptionDetails);
  };
}
