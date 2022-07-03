import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import Post from "../../database/entities/post";
import IPostDb from "../../data-access/interfaces/post-db";

export type IGetCategories = () => Promise<Post[] | null>;

export default function makeGetCategories({
  postDb,
  redis,
  logger,
}: {
  postDb: IPostDb;
  redis: Redis;
  logger: Logger;
}): IGetCategories {
  return async function getCategories(): Promise<Post[] | null> {
    const categories = await postDb.findAll();
    return categories;
  };
}
