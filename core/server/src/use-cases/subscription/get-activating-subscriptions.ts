import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export type IGetActivatingSubscriptions = () => Promise<ISubscription[]>;

export default function makeGetActivatingSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetActivatingSubscriptions {
  return async function getActivatingSubscriptions() {
    return await subscriptionDb.findAllActivating();
  };
}
