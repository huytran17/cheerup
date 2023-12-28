import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPostsForSEO = () => Promise<Post[] | null>;

export default function makeGetPostsForSEO({
  postDb,
}: {
  postDb: IPostDb;
}): IGetPostsForSEO {
  return async function getPostsForSEO() {
    return await postDb.findAllForSEO();
  };
}
