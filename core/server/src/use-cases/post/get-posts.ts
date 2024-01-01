import IPost from "../../database/interfaces/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPosts = () => Promise<IPost[]>;

export default function makeGetPosts({
  postDb,
}: {
  postDb: IPostDb;
}): IGetPosts {
  return async function getPosts() {
    return await postDb.findAll();
  };
}
