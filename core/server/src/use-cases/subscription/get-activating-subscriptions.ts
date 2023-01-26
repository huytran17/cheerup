import { Logger } from "winston";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import Subscription from "../../database/entities/subscription";

export type IGetActivatingSubscriptions = () => Promise<Subscription[] | null>;

export default function makeGetActivatingSubscriptions({
  subscriptionDb,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  logger: Logger;
}): IGetActivatingSubscriptions {
  return async function getActivatingSubscriptions(): Promise<
    Subscription[] | null
  > {
    const subscriptions = await subscriptionDb.findAllActivating();
    return subscriptions;
  };
}
