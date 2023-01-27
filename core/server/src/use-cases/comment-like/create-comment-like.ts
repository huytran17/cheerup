import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "_id">;
}

export type ICreateCommentLike = ({
  commentLikeDetails,
}: ICreateCommentLikeData) => Promise<CommentLike | null>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): ICreateCommentLike {
  return async function createCommentLike({
    commentLikeDetails,
  }: ICreateCommentLikeData): Promise<CommentLike | null> {
    const comment_like = await commentLikeDb.insert(commentLikeDetails);
    return comment_like;
  };
}
