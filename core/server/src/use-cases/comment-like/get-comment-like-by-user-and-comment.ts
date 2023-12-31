import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export type IGetCommentLikeByUserAndComment = ({
  user_id,
  comment_id,
}: {
  user_id: string;
  comment_id: string;
}) => Promise<CommentLike>;

export default function makeGetCommentLikeByUserAndComment({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): IGetCommentLikeByUserAndComment {
  return async function getCommentLikeByUserAndComment({
    user_id,
    comment_id,
  }) {
    return await commentLikeDb.findByUserAndComment({
      user_id,
      comment_id,
    });
  };
}
