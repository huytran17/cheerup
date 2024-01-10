import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLikePayload extends Partial<ICommentLike> {
  [key: string]: any;
}

interface ICreateCommentLike {
  commentLikeDetails: ICreateCommentLikePayload;
}

export type CreateCommentLike = ({
  commentLikeDetails,
}: ICreateCommentLike) => Promise<ICommentLike>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CreateCommentLike {
  return async function createCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.insert(commentLikeDetails);
  };
}
