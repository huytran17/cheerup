import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type IGetSubscriptionByEmail = ({
  email,
}: {
  email: string;
}) => Promise<ISubscription>;

export default function makeGetSubscriptionByEmail({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): IGetSubscriptionByEmail {
  return async function getSubscriptionByEmail({ email }) {
    return await subscriptionDb.findByEmail({ email });
  };
}
