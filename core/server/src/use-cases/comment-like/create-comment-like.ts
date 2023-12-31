import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "_id" | "created_at">;
}

export type ICreateCommentLike = ({
  commentLikeDetails,
}: ICreateCommentLikeData) => Promise<CommentLike>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): ICreateCommentLike {
  return async function createCommentLike({ commentLikeDetails }) {
    return await commentLikeDb.insert(commentLikeDetails);
  };
}
