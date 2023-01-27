import CommentLike from "../../database/entities/comment-like";
import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";
import ICommentLike from "../../database/interfaces/comment-like";

export interface IUpdateCommentLikeData {
  commentLikeDetails: Omit<ICommentLike, "_id">;
}

export type IUpdateCommentLike = ({
  commentLikeDetails,
}: IUpdateCommentLikeData) => Promise<CommentLike | null>;

export default function makeUpdateCommentLike({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): IUpdateCommentLike {
  return async function updateCommentLike({
    commentLikeDetails,
  }: IUpdateCommentLikeData): Promise<CommentLike | null> {
    const comment_like = await commentLikeDb.update(commentLikeDetails);
    return comment_like;
  };
}
