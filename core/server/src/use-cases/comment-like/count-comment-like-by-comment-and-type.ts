import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export interface ICountCommentLikeByCommentAndTypePayload {
  comment_id: string;
  type: string;
}

export type CountCommentLikeByCommentAndType = ({
  comment_id,
  type,
}: ICountCommentLikeByCommentAndTypePayload) => Promise<number>;

export default function makeCountCommentLikeByCommentAndType({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CountCommentLikeByCommentAndType {
  return async function countCommentLikeByCommentAndType({ comment_id, type }) {
    return await commentLikeDb.countCommentLikeByCommentAndType({
      comment_id,
      type,
    });
  };
}
