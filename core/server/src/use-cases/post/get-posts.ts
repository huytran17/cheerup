import { Logger } from "winston";
import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPosts = () => Promise<Post[] | null>;

export default function makeGetPosts({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPosts {
  return async function getPosts(): Promise<Post[] | null> {
    const posts = await postDb.findAll();
    return posts;
  };
}
