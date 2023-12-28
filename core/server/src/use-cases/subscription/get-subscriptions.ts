import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type IGetSubscriptions = () => Promise<Subscription[] | null>;

export default function makeGetSubscriptions({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetSubscriptions {
  return async function getSubscriptions() {
    return await subscriptionDb.findAll();
  };
}
