import ICommentDb, {
  IPaginatedCommentResult,
} from "../../data-access/interfaces/comment-db";

export type IGetCommentsByPostPaginated = (
  {
    post_id,
  }: {
    post_id: string;
  },
  {
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  }
) => Promise<IPaginatedCommentResult>;

export default function makeGetCommentsByPostPaginated({
  commentDb,
}: {
  commentDb: ICommentDb;
}): IGetCommentsByPostPaginated {
  return async function getCommentsByPostPaginated(
    { post_id },
    { query, page, entries_per_page }
  ) {
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
