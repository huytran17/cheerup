import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export interface IGetSubscription {
  _id: string;
}

export type GetSubscription = ({
  _id,
}: IGetSubscription) => Promise<ISubscription>;

export default function makeGetSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): GetSubscription {
  return async function getSubscription({ _id }) {
    return await subscriptionDb.findById({ _id });
  };
}
