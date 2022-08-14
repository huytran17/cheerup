import { Logger } from "winston";
import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";

export type IGetSubscribes = () => Promise<Subscribe[] | null>;

export default function makeGetSubscribes({
  subscribeDb,
  logger,
}: {
  subscribeDb: ISubscribeDb;
  logger: Logger;
}): IGetSubscribes {
  return async function getSubscribes(): Promise<Subscribe[] | null> {
    const subscribes = await subscribeDb.findAll();
    return subscribes;
  };
}
