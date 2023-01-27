import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface ICreateCommentLike {
  commentLikeDetails: Omit<ICommentLike, "_id">;
}

export type CreateCommentLike = ({
  commentLikeDetails,
}: ICreateCommentLike) => Promise<CommentLike | null>;

export default function makeCreateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CreateCommentLike {
  return async function createCommentLike({
    commentLikeDetails,
  }: ICreateCommentLike): Promise<CommentLike | null> {
    const comment_like = await commentLikeDb.insert(commentLikeDetails);
    return comment_like;
  };
}
