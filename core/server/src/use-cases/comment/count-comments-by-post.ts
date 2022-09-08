import ICommentDb from "../../data-access/interfaces/comment-db";
import { Logger } from "winston";

export type ICountCommentsByPost = ({
  post_id,
}: {
  post_id: string;
}) => Promise<number | null>;

export default function makeCountCommentsByPost({
  commentDb,
  logger,
}: {
  commentDb: ICommentDb;
  logger: Logger;
}): ICountCommentsByPost {
  return async function countCommentsByPost({
    post_id,
  }: {
    post_id: string;
  }): Promise<number | null> {
    const comments_count = await commentDb.countByPost({ post_id });
    return comments_count;
  };
}
