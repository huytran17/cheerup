import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface IUpdateCommentLike {
  commentLikeDetails: Omit<ICommentLike, "_id">;
}

export type UpdateCommentLike = ({
  commentLikeDetails,
}: IUpdateCommentLike) => Promise<CommentLike | null>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): UpdateCommentLike {
  return async function updateCommentLike({
    commentLikeDetails,
  }: IUpdateCommentLike): Promise<CommentLike | null> {
    const comment_like = await commentLikeDb.update(commentLikeDetails);
    return comment_like;
  };
}
