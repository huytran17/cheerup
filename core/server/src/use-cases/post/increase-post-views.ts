import IPostDb from "../../data-access/interfaces/post-db";
import IPost from "../../database/interfaces/post";

export interface IIncreasePostViews {
  _id: string;
}

export type IncreasePostViews = ({ _id }: IIncreasePostViews) => Promise<IPost>;

export default function makeIncreasePostViews({
  postDb,
}: {
  postDb: IPostDb;
}): IncreasePostViews {
  return async function increasePostViews({ _id }) {
    return await postDb.increaseViews({ _id });
  };
}
