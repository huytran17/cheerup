import { Logger } from "winston";
import Post from "../../database/entities/post";
import IPostDb, {
  IPaginatedPostResult,
} from "../../data-access/interfaces/post-db";

export type IGetPostsPaginated = (
  {
    categories,
    is_only_published,
    tags,
  }: { categories?: string[]; is_only_published?: boolean; tags?: string[] },
  {
    query,
    page,
    entries_per_page,
  }: {
    query: string;
    page: number;
    entries_per_page: number;
  }
) => Promise<IPaginatedPostResult | null>;

export default function makeGetPostsPaginated({
  postDb,
  logger,
}: {
  postDb: IPostDb;
  logger: Logger;
}): IGetPostsPaginated {
  return async function getPostsPaginated(
    {
      categories = [],
      is_only_published,
      tags,
    }: {
      categories?: string[];
      is_only_published?: boolean;
      tags?: string[];
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
  ): Promise<IPaginatedPostResult | null> {
    const posts = await postDb.findAllPaginated(
      { categories, is_only_published, tags },
      {
        query,
        page,
        entries_per_page,
      }
    );

    return posts;
  };
}
