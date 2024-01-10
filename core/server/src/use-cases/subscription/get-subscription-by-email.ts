import ISubscription from "../../database/interfaces/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export interface IGetSubscriptionByEmailPayload {
  email: string;
}

export type GetSubscriptionByEmail = ({
  email,
}: IGetSubscriptionByEmailPayload) => Promise<ISubscription>;

export default function makeGetSubscriptionByEmail({
  subscriptionDb,
}: {
  subscriptionDb: ISubscriptionDb;
}): GetSubscriptionByEmail {
  return async function getSubscriptionByEmail({ email }) {
    return await subscriptionDb.findByEmail({ email });
  };
}
