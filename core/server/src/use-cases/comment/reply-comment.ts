import Comment from "../../database/entities/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IReplyCommentData {
  commentDetails: Omit<IComment, "_id" | "created_at" | "updated_at">;
}

export type IReplyComment = ({
  commentDetails,
}: IReplyCommentData) => Promise<Comment | null>;

export default function makeReplyComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IReplyComment {
  return async function replyComment({
    commentDetails,
  }: IReplyCommentData): Promise<Comment | null> {
    const comment = await commentDb.insert(commentDetails);
    return comment;
  };
}
