import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import Subscription from "../../database/entities/subscription";

export type IGetActivatingSubscriptions = () => Promise<Subscription[] | null>;

export default function makeGetActivatingSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetActivatingSubscriptions {
  return async function getActivatingSubscriptions() {
    return await subscriptionDb.findAllActivating();
  };
}
