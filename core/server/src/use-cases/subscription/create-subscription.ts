import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface ICreateSubscription extends Partial<ISubscription> {}

export type CreateSubscription = (
  payload: ICreateSubscription
) => Promise<ISubscription>;

export default function makeCreateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): CreateSubscription {
  return async function createSubscription(payload) {
    return await subscriptionDb.insert(payload);
  };
}
