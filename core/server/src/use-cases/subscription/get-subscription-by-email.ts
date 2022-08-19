import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import { Logger } from "winston";

export type IGetSubscriptionByEmail = ({
  email,
}: {
  email: string;
}) => Promise<Subscription | null>;

export default function makeGetSubscriptionByEmail({
  subscriptionDb,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  logger: Logger;
}): IGetSubscriptionByEmail {
  return async function getSubscriptionByEmail({
    email,
  }: {
    email: string;
  }): Promise<Subscription | null> {
    const subscription = await subscriptionDb.findByEmail({ email });
    return subscription;
  };
}
