import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import ISubscription from "../../database/interfaces/subscription";

export interface IUpdateSubscriptionPayload extends Partial<ISubscription> {
  [key: string]: any;
}

export interface IUpdateSubscription {
  subscriptionDetails: IUpdateSubscriptionPayload;
}

export type UpdateSubscription = ({
  subscriptionDetails,
}: IUpdateSubscription) => Promise<ISubscription>;

export default function makeUpdateSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): UpdateSubscription {
  return async function updateSubscription({ subscriptionDetails }) {
    return await subscriptionDb.update(subscriptionDetails);
  };
}
