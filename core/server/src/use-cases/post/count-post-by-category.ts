import IPostDb from "../../data-access/interfaces/post-db";

export type CountPostByCategory = ({
  category_id,
}: {
  category_id: string;
}) => Promise<number>;

export default function makeCountPostByCategory({
  postDb,
}: {
  postDb: IPostDb;
}): CountPostByCategory {
  return async function countPostByCategory({ category_id }) {
    return await postDb.countByCategory({ category_id });
  };
}
