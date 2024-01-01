import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export type GetActivatingSubscriptions = () => Promise<ISubscription[]>;

export default function makeGetActivatingSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): GetActivatingSubscriptions {
  return async function getActivatingSubscriptions() {
    return await subscriptionDb.findAllActivating();
  };
}
