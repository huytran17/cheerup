import IPostDb, {
  IPaginatedPostResult,
} from "../../data-access/interfaces/post-db";

export type GetPostsPaginated = (
  {
    categories,
    is_only_published,
    tags,
    sorts,
  }: {
    categories?: string[];
    is_only_published?: boolean;
    tags?: string[];
    sorts?: string;
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
) => Promise<IPaginatedPostResult>;

export default function makeGetPostsPaginated({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostsPaginated {
  return async function getPostsPaginated(
    { categories = [], is_only_published, tags, sorts },
    { query, page, entries_per_page }
  ) {
    return await postDb.findAllPaginated(
      { categories, is_only_published, tags, sorts },
      {
        query,
        page,
        entries_per_page,
      }
    );
  };
}
