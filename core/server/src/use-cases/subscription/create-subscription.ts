import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface ICreateSubscriptionData {
  subscriptionDetails: Omit<ISubscription, "_id">;
}

export type CreateSubscription = ({
  subscriptionDetails,
}: ICreateSubscriptionData) => Promise<ISubscription>;

export default function makeCreateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): CreateSubscription {
  return async function createSubscription({ subscriptionDetails }) {
    return await subscriptionDb.insert(subscriptionDetails);
  };
}
