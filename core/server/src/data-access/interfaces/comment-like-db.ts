import ICommentLike from "../../database/interfaces/comment-like";
export default interface ICommentLikeDb {
  countCommentLikeByCommentAndType: ({
    comment_id,
    type,
  }: {
    comment_id: string;
    type: string;
  }) => Promise<number>;
  insert: (payload: Partial<ICommentLike>) => Promise<ICommentLike>;
  hardDelete: ({ _id }: { _id: string }) => Promise<ICommentLike>;
  findByUserAndComment: ({
    user_id,
    comment_id,
  }: {
    user_id: string;
    comment_id: string;
  }) => Promise<ICommentLike>;
  update: (updatePayload: Partial<ICommentLike>) => Promise<ICommentLike>;
}
