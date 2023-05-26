import { Logger } from "winston";
import IPostBookmarkDb, {
  IPaginatedPostBookmarkResult,
} from "../../data-access/interfaces/post-bookmark-db";

export type IGetPostBookmarksPaginated = ({
  query,
  page,
  entries_per_page,
  user_id
}: {
  query: string;
  page: number;
  entries_per_page: number;
  user_id?: string
}) => Promise<IPaginatedPostBookmarkResult | null>;

export default function makeGetPostBookmarksPaginated({
  postBookmarkDb,
  logger,
}: {
  postBookmarkDb: IPostBookmarkDb;
  logger: Logger;
}): IGetPostBookmarksPaginated {
  return async function getPostBookmarksPaginated({
    query,
    page,
    entries_per_page,
    user_id
  }: {
    query: string;
    page: number;
    entries_per_page: number;
    user_id?: string;
  }): Promise<IPaginatedPostBookmarkResult | null> {
    const post_bookmarks = await postBookmarkDb.findAllPaginated({
      query,
      page,
      entries_per_page,
      user_id
    });

    return post_bookmarks;
  };
}
