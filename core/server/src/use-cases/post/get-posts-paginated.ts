import IPostDb, {
  IPaginatedPostResult,
} from "../../data-access/interfaces/post-db";

export interface IGetPostsPaginatedPayload {
  categories?: string[];
  tags?: string[];
  sorts?: string;
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetPostsPaginated = ({
  categories,
  tags,
  sorts,
  query,
  page,
  entries_per_page,
}: IGetPostsPaginatedPayload) => Promise<IPaginatedPostResult>;

export default function makeGetPostsPaginated({
  postDb,
}: {
  postDb: IPostDb;
}): GetPostsPaginated {
  return async function getPostsPaginated({
    query,
    page,
    entries_per_page,
    categories = [],
    tags,
    sorts,
  }) {
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
