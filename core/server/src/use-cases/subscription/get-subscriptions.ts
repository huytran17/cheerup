import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type GetSubscriptions = () => Promise<ISubscription[]>;

export default function makeGetSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): GetSubscriptions {
  return async function getSubscriptions() {
    return await subscriptionDb.findAll();
  };
}
