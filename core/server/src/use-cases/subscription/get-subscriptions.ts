import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type IGetSubscriptions = () => Promise<ISubscription[]>;

export default function makeGetSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetSubscriptions {
  return async function getSubscriptions() {
    return await subscriptionDb.findAll();
  };
}
