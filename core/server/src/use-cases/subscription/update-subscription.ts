import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface IUpdateSubscriptionData {
  subscriptionDetails: Omit<ISubscription, "_id">;
}

export type UpdateSubscription = ({
  subscriptionDetails,
}: IUpdateSubscriptionData) => Promise<ISubscription>;

export default function makeUpdateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): UpdateSubscription {
  return async function updateSubscription({ subscriptionDetails }) {
    return await subscriptionDb.update(subscriptionDetails);
  };
}
