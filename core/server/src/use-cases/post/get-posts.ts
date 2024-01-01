import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type GetPosts = () => Promise<IPost[]>;

export default function makeGetPosts({
  postDb,
}: {
  postDb: IPostDb;
}): GetPosts {
  return async function getPosts() {
    return await postDb.findAll();
  };
}
