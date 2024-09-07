import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export interface ICountCommentLikeByCommentAndType {
  comment_id: string;
  type: string;
}

export type CountCommentLikeByCommentAndType = ({
  comment_id,
  type,
}: ICountCommentLikeByCommentAndType) => Promise<number>;

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
