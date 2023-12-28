import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IHardDeleteComment = ({
  _id,
}: {
  _id: string;
}) => Promise<Comment | null>;

export default function makeHardDeleteComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IHardDeleteComment {
  return async function hardDeleteComment({ _id }) {
    return await commentDb.hardDelete({ _id });
  };
}
