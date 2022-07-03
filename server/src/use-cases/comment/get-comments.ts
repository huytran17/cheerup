import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetCategories = () => Promise<Comment[] | null>;

export default function makeGetCategories({
  commentDb,
  redis,
  logger,
}: {
  commentDb: ICommentDb;
  redis: Redis;
  logger: Logger;
}): IGetCategories {
  return async function getCategories(): Promise<Comment[] | null> {
    const categories = await commentDb.findAll();
    return categories;
  };
}
