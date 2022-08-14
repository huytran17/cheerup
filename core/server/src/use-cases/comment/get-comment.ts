import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetComment = ({ _id }: { _id: string }) => Promise<Comment | null>;

export default function makeGetComment({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetComment {
  return async function getComment({
    _id,
  }: {
    _id: string;
  }): Promise<Comment | null> {
    const comment = await commentDb.findById({ _id });
    return comment;
  };
}
