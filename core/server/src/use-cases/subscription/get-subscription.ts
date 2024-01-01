import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type GetSubscription = ({
  _id,
}: {
  _id: string;
}) => Promise<ISubscription>;

export default function makeGetSubscription({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): GetSubscription {
  return async function getSubscription({ _id }) {
    return await subscriptionDb.findById({ _id });
  };
}
