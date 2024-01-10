import ICommentLike from "../../database/interfaces/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export interface IGetCommentLikeByUserAndCommentPayload {
  user_id: string;
  comment_id: string;
}

export type GetCommentLikeByUserAndComment = ({
  user_id,
  comment_id,
}: IGetCommentLikeByUserAndCommentPayload) => Promise<ICommentLike>;

export default function makeGetCommentLikeByUserAndComment({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): GetCommentLikeByUserAndComment {
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
