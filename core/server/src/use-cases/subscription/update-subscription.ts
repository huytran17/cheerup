import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface IUpdateSubscription extends Partial<ISubscription> {
  [key: string]: any;
}

export type UpdateSubscription = (
  payload: IUpdateSubscription
) => Promise<ISubscription>;

export default function makeUpdateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): UpdateSubscription {
  return async function updateSubscription(payload) {
    return await subscriptionDb.update(payload);
  };
}
