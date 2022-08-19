import { Logger } from "winston";
import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";

export type IGetSubscriptions = () => Promise<Subscription[] | null>;

export default function makeGetSubscriptions({
  subscriptionDb,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  logger: Logger;
}): IGetSubscriptions {
  return async function getSubscriptions(): Promise<Subscription[] | null> {
    const subscriptions = await subscriptionDb.findAll();
    return subscriptions;
  };
}
