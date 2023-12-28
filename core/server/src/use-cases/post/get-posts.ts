import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPosts = () => Promise<Post[] | null>;

export default function makeGetPosts({
  postDb,
}: {
  postDb: IPostDb;
}): IGetPosts {
  return async function getPosts() {
    return await postDb.findAll();
  };
}
