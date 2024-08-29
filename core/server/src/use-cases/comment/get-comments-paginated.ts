import ICommentDb, {
  IPaginatedCommentsResult,
} from "../../data-access/interfaces/comment-db";

export interface IGetCommentsPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetCommentsByParentId = ({
  query,
  page,
  entries_per_page,
}: IGetCommentsPaginated) => Promise<IPaginatedCommentsResult>;

export default function makeGetCommentsPaginated({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetCommentsByParentId {
  return async function getCommentsPaginated({
    query,
    page,
    entries_per_page,
  }) {
    return await commentDb.findAllPaginated({ query, page, entries_per_page });
  };
}
