import { Logger } from "winston";
import IPostDb, {
  IPaginatedPostResult,
} from "../../data-access/interfaces/post-db";
import { SortOrder } from "mongoose";

export type IGetPostsPaginated = (
  {
    categories,
    is_only_published,
    tags,
    sorts,
  }: {
    categories?: string[];
    is_only_published?: boolean;
    tags?: string[];
    sorts?: {
      [key: string]: SortOrder;
    };
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
      sorts,
    }: {
      categories?: string[];
      is_only_published?: boolean;
      tags?: string[];
      sorts?: {
        [key: string]: SortOrder;
      };
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
      { categories, is_only_published, tags, sorts },
      {
        query,
        page,
        entries_per_page,
      }
    );

    return posts;
  };
}
