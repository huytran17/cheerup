import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetComment = ({
  _id,
  is_only_parent,
}: {
  _id: string;
  is_only_parent?: boolean;
}) => Promise<Comment | null>;

export default function makeGetComment({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetComment {
  return async function getComment({
    _id,
    is_only_parent = true,
  }: {
    _id: string;
    is_only_parent: boolean;
  }): Promise<Comment | null> {
    const comment = await commentDb.findById({ _id, is_only_parent });
    return comment;
  };
}
