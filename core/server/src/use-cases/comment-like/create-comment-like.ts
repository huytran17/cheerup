import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "_id" | "created_at">;
}

export type CreateCommentLike = ({
  commentLikeDetails,
}: ICreateCommentLikeData) => Promise<ICommentLike>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CreateCommentLike {
  return async function createCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.insert(commentLikeDetails);
  };
}
