import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface IUpdateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "created_at">;
}

export type UpdateCommentLike = ({
  commentLikeDetails,
}: IUpdateCommentLikeData) => Promise<ICommentLike>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): UpdateCommentLike {
  return async function updateCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.update(commentLikeDetails);
  };
}
