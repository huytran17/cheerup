import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export interface IGetCommentsByParentPayload {
  _id: string;
}

export type GetCommentsByParent = ({
  _id,
}: IGetCommentsByParentPayload) => Promise<IComment[]>;

export default function makeGetCommentsByParent({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetCommentsByParent {
  return async function getCommentsByParent({ _id }) {
    return await commentDb.findAllByParent({ _id });
  };
}
