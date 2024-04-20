import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLikePayload extends Partial<ICommentLike> {
  [key: string]: any;
}

export type CreateCommentLike = (
  payload: ICreateCommentLikePayload
) => Promise<ICommentLike>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CreateCommentLike {
  return async function createCommentLike(payload) {
    return await commentLikeDb.insert(payload);
  };
}
