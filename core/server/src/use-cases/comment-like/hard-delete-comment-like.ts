import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export type IHardDeleteCommentLike = ({
  _id,
}: {
  _id: string;
}) => Promise<CommentLike>;

export default function makeHardDeleteCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): IHardDeleteCommentLike {
  return async function hardDeleteCommentLike({ _id }) {
    return await commentLikeDb.hardDelete({ _id });
  };
}
