import { Logger } from "winston";
import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPostsForSEO = () => Promise<Post[] | null>;

export default function makeGetPostsForSEO({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPostsForSEO {
  return async function getPostsForSEO(): Promise<Post[] | null> {
    const posts = await postDb.findAllForSEO();
    return posts;
  };
}
