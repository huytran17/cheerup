import Subscription from "../../database/entities/subscription";
import ISubscriptionDb from "../../data-access/interfaces/subscription-db";
import { Logger } from "winston";

export type IGetSubscription = ({
  _id,
}: {
  _id: string;
}) => Promise<Subscription | null>;

export default function makeGetSubscription({
  subscriptionDb,
  logger,
}: {
  subscriptionDb: ISubscriptionDb;
  logger: Logger;
}): IGetSubscription {
  return async function getSubscription({
    _id,
  }: {
    _id: string;
  }): Promise<Subscription | null> {
    const subscription = await subscriptionDb.findById({ _id });
    return subscription;
  };
}
