import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";
import { Logger } from "winston";

export type IGetSubscribe = ({
  _id,
}: {
  _id: string;
}) => Promise<Subscribe | null>;

export default function makeGetSubscribe({
  subscribeDb,
  logger,
}: {
  subscribeDb: ISubscribeDb;
  logger: Logger;
}): IGetSubscribe {
  return async function getSubscribe({
    _id,
  }: {
    _id: string;
  }): Promise<Subscribe | null> {
    const subscribe = await subscribeDb.findById({ _id });
    return subscribe;
  };
}
