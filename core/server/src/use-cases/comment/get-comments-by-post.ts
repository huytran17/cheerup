import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type IGetCommentsByPost = ({
  post_id,
}: {
  post_id: string;
}) => Promise<Comment[] | null>;

export default function makeGetCommentsByPost({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): IGetCommentsByPost {
  return async function getCommentsByPost({
    post_id,
  }: {
    post_id: string;
  }): Promise<Comment[] | null> {
    const comments = await commentDb.findAllByPost({ post_id });
    return comments;
  };
}
