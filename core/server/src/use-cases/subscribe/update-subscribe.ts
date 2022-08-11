import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";
import ISubscribe from "../../database/interfaces/subscribe";

export interface IUpdateSubscribeData {
  subscribeDetails: Omit<ISubscribe, "_id">;
}

export type IUpdateSubscribe = ({
  subscribeDetails,
}: IUpdateSubscribeData) => Promise<Subscribe | null>;

export default function makeUpdateSubscribe({
  subscribeDb,
}: {
  subscribeDb: ISubscribeDb;
}): IUpdateSubscribe {
  return async function updateSubscribe({
    subscribeDetails,
  }: IUpdateSubscribeData): Promise<Subscribe | null> {
    const subscribe = await subscribeDb.update(subscribeDetails);
    return subscribe;
  };
}
