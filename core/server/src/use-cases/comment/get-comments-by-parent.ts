import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetCommentsByParent = ({
  parent_id,
}: {
  parent_id: string;
}) => Promise<Comment[] | null>;

export default function makeGetCommentsByParent({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetCommentsByParent {
  return async function getCommentsByParent({
    parent_id,
  }: {
    parent_id: string;
  }): Promise<Comment[] | null> {
    const comments = await commentDb.findAllByParent({ parent_id });
    return comments;
  };
}
