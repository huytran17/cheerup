import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLike extends Partial<ICommentLike> {
  [key: string]: any;
}

export type CreateCommentLike = (
  payload: ICreateCommentLike
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
