import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface ICreateSubscriptionPayload extends Partial<ISubscription> {}

interface ICreateSubscription {
  subscriptionDetails: ICreateSubscriptionPayload;
}

export type CreateSubscription = ({
  subscriptionDetails,
}: ICreateSubscription) => Promise<ISubscription>;

export default function makeCreateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): CreateSubscription {
  return async function createSubscription({ subscriptionDetails }) {
    return await subscriptionDb.insert(subscriptionDetails);
  };
}
