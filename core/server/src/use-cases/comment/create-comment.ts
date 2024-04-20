import ICommentDb from "../../data-access/interfaces/comment-db";
import IComment from "../../database/interfaces/comment";

export interface ICreateCommentPayload
  extends Omit<Partial<IComment>, "post" | "parent"> {
  [key: string]: any;
}

export type CreateComment = (
  payload: ICreateCommentPayload
) => Promise<IComment>;

export default function makeCreateComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): CreateComment {
  return async function createComment(payload) {
    return await commentDb.insert(payload);
  };
}
