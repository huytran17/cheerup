import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICommentLikePayload extends Partial<ICommentLike> {}

export type UpdateCommentLike = (
  payload: ICommentLikePayload
) => Promise<ICommentLike>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): UpdateCommentLike {
  return async function updateCommentLike(payload) {
    return await commentLikeDb.update(payload);
  };
}
