import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type GetPostsForSEO = () => Promise<IPost[]>;

export default function makeGetPostsForSEO({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostsForSEO {
  return async function getPostsForSEO() {
    return await postDb.findAllForSEO();
  };
}
