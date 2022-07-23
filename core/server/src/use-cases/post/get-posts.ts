import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetPosts = () => Promise<Post[] | null>;

export default function makeGetPosts({
  postDb,
  redis,
  logger,
}: {
  postDb: IPostDb;
  redis: Redis;
  logger: Logger;
}): IGetPosts {
  return async function getPosts(): Promise<Post[] | null> {
    const posts = await postDb.findAll();
    return posts;
  };
}
