import IPostDb, {
  IPaginatedPostResult,
} from "../../data-access/interfaces/post-db";

export type GetPostsPaginated = (
  {
    categories,
    tags,
    sorts,
  }: {
    categories?: string[];
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
    { categories = [], tags, sorts },
    { query, page, entries_per_page }
  ) {
    return await postDb.findAllPaginated(
      { categories, tags, sorts },
      {
        query,
        page,
        entries_per_page,
      }
    );
  };
}
