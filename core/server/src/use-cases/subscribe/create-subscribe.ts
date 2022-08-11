import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";
import ISubscribe from "../../database/interfaces/subscribe";

export interface ICreateSubscribeData {
  subscribeDetails: Omit<ISubscribe, "_id">;
}

export type ICreateSubscribe = ({
  subscribeDetails,
}: ICreateSubscribeData) => Promise<Subscribe | null>;

export default function makeCreateSubscribe({
  subscribeDb,
}: {
  subscribeDb: ISubscribeDb;
}): ICreateSubscribe {
  return async function createSubscribe({
    subscribeDetails,
  }: ICreateSubscribeData): Promise<Subscribe | null> {
    const subscribe = await subscribeDb.insert(subscribeDetails);
    return subscribe;
  };
}
