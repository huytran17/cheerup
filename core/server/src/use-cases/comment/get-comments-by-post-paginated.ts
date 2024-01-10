import ICommentDb, {
  IPaginatedCommentResult,
} from "../../data-access/interfaces/comment-db";

export interface IGetCommentsByPostPaginatedPayload {
  query: string;
  page: number;
  entries_per_page: number;
  post_id: string;
}

export type GetCommentsByPostPaginated = ({
  post_id,
  query,
  page,
  entries_per_page,
}: IGetCommentsByPostPaginatedPayload) => Promise<IPaginatedCommentResult>;

export default function makeGetCommentsByPostPaginated({
  commentDb,
}: {
  commentDb: ICommentDb;
}): GetCommentsByPostPaginated {
  return async function getCommentsByPostPaginated({
    query,
    page,
    entries_per_page,
    post_id,
  }) {
    return await commentDb.findAllByPostPaginated(
      { post_id },
      {
        query,
        page,
        entries_per_page,
      }
    );
  };
}
