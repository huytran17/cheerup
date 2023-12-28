import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export type ICountCommentLikeByCommentAndType = ({
  comment_id,
  type,
}: {
  comment_id: string;
  type: string;
}) => Promise<number>;

export default function makeCountCommentLikeByCommentAndType({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): ICountCommentLikeByCommentAndType {
  return async function countCommentLikeByCommentAndType({ comment_id, type }) {
    return await commentLikeDb.countCommentLikeByCommentAndType({
      comment_id,
      type,
    });
  };
}
