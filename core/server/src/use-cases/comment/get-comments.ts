import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export type IGetComments = () => Promise<IComment[]>;

export default function makeGetComments({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IGetComments {
  return async function getComments() {
    return await commentDb.findAll();
  };
}
