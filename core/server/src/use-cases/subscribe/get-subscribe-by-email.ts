import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";
import { Logger } from "winston";

export type IGetSubscribeByEmail = ({
  email,
}: {
  email: string;
}) => Promise<Subscribe | null>;

export default function makeGetSubscribeByEmail({
  subscribeDb,
  logger,
}: {
  subscribeDb: ISubscribeDb;
  logger: Logger;
}): IGetSubscribeByEmail {
  return async function getSubscribeByEmail({
    email,
  }: {
    email: string;
  }): Promise<Subscribe | null> {
    const subscribe = await subscribeDb.findByEmail({ email });
    return subscribe;
  };
}
