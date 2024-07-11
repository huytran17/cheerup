import IPostBookmarkDb, {
  IPaginatedPostBookmarksResult,
} from "../../data-access/interfaces/post-bookmark-db";

export interface IGetPostBookmarksPaginatedPayload {
  query: string;
  page: number;
  entries_per_page: number;
  user_id?: string;
}

export type GetPostBookmarksPaginated = ({
  query,
  page,
  entries_per_page,
  user_id,
}: IGetPostBookmarksPaginatedPayload) => Promise<IPaginatedPostBookmarksResult>;

export default function makeGetPostBookmarksPaginated({
  postBookmarkDb,
}: {
  postBookmarkDb: IPostBookmarkDb;
}): GetPostBookmarksPaginated {
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
