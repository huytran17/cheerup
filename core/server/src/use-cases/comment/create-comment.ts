import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface ICreateCommentPayload
  extends Omit<Partial<IComment>, "post" | "parent"> {
  [key: string]: any;
}

interface ICreateComment {
  commentDetails: ICreateCommentPayload;
}

export type CreateComment = ({
  commentDetails,
}: ICreateComment) => Promise<IComment>;

export default function makeCreateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): CreateComment {
  return async function createComment({ commentDetails }) {
    return await commentDb.insert(commentDetails);
  };
}
