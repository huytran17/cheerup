import CommentLike from "../../database/entities/comment-like";
import ICommentLike from "../../database/interfaces/comment-like";
export default interface ICommentLikeDb {
  countCommentLikeByCommentAndType: ({
    comment_id,
    type,
  }: {
    comment_id: string;
    type: string;
  }) => Promise<number>;
  insert: (payload: Partial<ICommentLike>) => Promise<CommentLike | null>;
  hardDelete: ({ _id }: { _id: string }) => Promise<CommentLike | null>;
  findByUserAndComment: ({
    user_id,
    comment_id,
  }: {
    user_id: string;
    comment_id: string;
  }) => Promise<CommentLike | null>;
  update: (updatePayload: Partial<ICommentLike>) => Promise<CommentLike | null>;
}
