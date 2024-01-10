import IPostDb from "../../data-access/interfaces/post-db";

export interface ICountPostByCategoryPayload {
  category_id: string;
}

export type CountPostByCategory = ({
  category_id,
}: ICountPostByCategoryPayload) => Promise<number>;

export default function makeCountPostByCategory({
  postDb,
}: {
  postDb: IPostDb;
}): CountPostByCategory {
  return async function countPostByCategory({ category_id }) {
    return await postDb.countByCategory({ category_id });
  };
}
