import { Logger } from "winston";
import Post from "../../database/entities/post";
import IPostDb, {PaginatedPostResult} from "../../data-access/interfaces/post-db";

export type IGetPostsPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page: number;
}) => Promise<PaginatedPostResult | null>;

export default function makeGetPostsPaginated({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPostsPaginated {
  return async function getPostsPaginated({
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  }): Promise<PaginatedPostResult | null> {
    const posts = await postDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });

    return posts;
  };
}
