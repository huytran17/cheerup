import Subscribe from "../../database/entities/subscribe";
import ISubscribeDb from "../../data-access/interfaces/subscribe-db";

export type IDeleteSubscribe = ({
  _id,
}: {
  _id: string;
}) => Promise<Subscribe | null>;

export default function makeDeleteSubscribe({
  subscribeDb,
}: {
  subscribeDb: ISubscribeDb;
}): IDeleteSubscribe {
  return async function deleteSubscribe({
    _id,
  }: {
    _id: string;
  }): Promise<Subscribe | null> {
    const subscribe = await subscribeDb.delete({ _id });
    return subscribe;
  };
}
