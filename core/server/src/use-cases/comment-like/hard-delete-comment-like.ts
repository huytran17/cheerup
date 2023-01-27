import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export type HardDeleteCommentLike = ({
  _id,
}: {
  _id: string;
}) => Promise<CommentLike | null>;

export default function makeHardDeleteCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): HardDeleteCommentLike {
  return async function hardDeleteCommentLike({
    _id,
  }: {
    _id: string;
  }): Promise<CommentLike | null> {
    const comment_like = await commentLikeDb.hardDelete({ _id });
    return comment_like;
  };
}
