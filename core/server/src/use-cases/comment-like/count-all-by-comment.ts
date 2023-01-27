import ICommentLikeDb from "../../data-access/interfaces/comment-like-db";

export type CountAllByComment = ({
  comment_id,
}: {
  comment_id: string;
}) => Promise<number>;

export default function makeCountAllByComment({
  commentLikeDb,
}: {
  commentLikeDb: ICommentLikeDb;
}): CountAllByComment {
  return async function countAllByComment({
    comment_id,
  }: {
    comment_id: string;
  }): Promise<number> {
    const comment_like_count = await commentLikeDb.countAllByComment({
      comment_id,
    });
    return comment_like_count;
  };
}
