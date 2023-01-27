import CommentLike from "../../database/entities/comment-like";
import ICommentLike from "../../database/interfaces/comment-like";
export default interface ICommentLikeDb {
  countAllByComment: ({
    comment_id,
  }: {
    comment_id: string;
  }) => Promise<number>;
  insert: (payload: Partial<ICommentLike>) => Promise<CommentLike | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<CommentLike | null>;
  update: (updatePayload: Partial<ICommentLike>) => Promise<CommentLike | null>;
}
