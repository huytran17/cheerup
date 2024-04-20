import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IReplyCommentPayload
  extends Omit<Partial<IComment>, "post" | "parent"> {
  [kay: string]: any;
}

export type ReplyComment = (payload: IReplyCommentPayload) => Promise<IComment>;

export default function makeReplyComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): ReplyComment {
  return async function replyComment(payload) {
    return await commentDb.insert(payload);
  };
}
