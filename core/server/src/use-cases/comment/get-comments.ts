import { Logger } from "winston";
import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetComments = () => Promise<Comment[] | null>;

export default function makeGetComments({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetComments {
  return async function getComments(): Promise<Comment[] | null> {
    const categories = await commentDb.findAll();
    return categories;
  };
}
