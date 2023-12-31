import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface IUpdateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "created_at">;
}

export type IUpdateCommentLike = ({
  commentLikeDetails,
}: IUpdateCommentLikeData) => Promise<CommentLike>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): IUpdateCommentLike {
  return async function updateCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.update(commentLikeDetails);
  };
}
