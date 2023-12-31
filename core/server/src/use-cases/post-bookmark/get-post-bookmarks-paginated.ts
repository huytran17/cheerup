import IPostBookmarkDb, {
  IPaginatedPostBookmarkResult,
} from "../../data-access/interfaces/post-bookmark-db";

export type IGetPostBookmarksPaginated = ({
  query,
  page,
  entries_per_page,
  user_id,
}: {
  query: string;
  page: number;
  entries_per_page: number;
  user_id?: string;
}) => Promise<IPaginatedPostBookmarkResult>;

export default function makeGetPostBookmarksPaginated({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): IGetPostBookmarksPaginated {
  return async function getPostBookmarksPaginated({
    query,
    page,
    entries_per_page,
    user_id,
  }) {
    return await postBookmarkDb.findAllPaginated({
      query,
      page,
      entries_per_page,
      user_id,
    });
  };
}
