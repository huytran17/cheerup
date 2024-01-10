import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICommentLikePayload extends Partial<ICommentLike> {}

interface IUpdateCommentLike {
  commentLikeDetails: ICommentLikePayload;
}

export type UpdateCommentLike = ({
  commentLikeDetails,
}: IUpdateCommentLike) => Promise<ICommentLike>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): UpdateCommentLike {
  return async function updateCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.update(commentLikeDetails);
  };
}
