import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IReplyCommentData {
  commentDetails: Omit<IComment, "_id" | "created_at" | "updated_at">;
}

export type ReplyComment = ({
  commentDetails,
}: IReplyCommentData) => Promise<IComment>;

export default function makeReplyComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): ReplyComment {
  return async function replyComment({ commentDetails }) {
    return await commentDb.insert(commentDetails);
  };
}
