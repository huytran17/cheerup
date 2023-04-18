import IPostDb from "../../data-access/interfaces/post-db";

export type ICountPostByCategory = ({
  category_id,
}: {
  category_id: string;
}) => Promise<number>;

export default function makeCountPostByCategory({
  postDb,
}: {
  postDb: IPostDb;
}): ICountPostByCategory {
  return async function countPostByCategory({
    category_id,
  }: {
    category_id: string;
  }): Promise<number> {
    const post = await postDb.countByCategory({ category_id });
    return post;
  };
}
