import IComment from "../../database/interfaces/comment";
import ICommentDb from "../../data-access/interfaces/comment-db";

export interface IGetComment {
  _id: string;
  is_only_parent?: boolean;
  is_show_children?: boolean;
}

export type GetComment = ({
  _id,
  is_only_parent,
  is_show_children,
}: IGetComment) => Promise<IComment>;

export default function makeGetComment({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetComment {
  return async function getComment({ _id, is_only_parent, is_show_children }) {
    return await commentDb.findById({
      _id,
      is_only_parent,
      is_show_children,
    });
  };
}
