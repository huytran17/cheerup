import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IDeleteComment = ({
  _id,
}: {
  _id: string;
}) => Promise<Comment | null>;

export default function makeDeleteComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IDeleteComment {
  return async function deleteComment({
    _id,
  }: {
    _id: string;
  }): Promise<Comment | null> {
    const comment = await commentDb.delete({ _id });
    return comment;
  };
}
