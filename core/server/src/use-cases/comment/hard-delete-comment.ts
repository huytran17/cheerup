import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export interface IHardDeleteComment {
  _id: string;
}

export type HardDeleteComment = ({
  _id,
}: IHardDeleteComment) => Promise<IComment>;

export default function makeHardDeleteComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): HardDeleteComment {
  return async function hardDeleteComment({ _id }) {
    return await commentDb.hardDelete({ _id });
  };
}
