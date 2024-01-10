import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface IReplyCommentPayload
  extends Omit<Partial<IComment>, "post" | "parent"> {
  [kay: string]: any;
}

export interface IReplyComment {
  commentDetails: IReplyCommentPayload;
}

export type ReplyComment = ({
  commentDetails,
}: IReplyComment) => Promise<IComment>;

export default function makeReplyComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): ReplyComment {
  return async function replyComment({ commentDetails }) {
    return await commentDb.insert(commentDetails);
  };
}
