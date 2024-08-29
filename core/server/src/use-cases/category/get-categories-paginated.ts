import ICategoryDb, {
  IPaginatedCategoriesResult,
} from "../../data-access/interfaces/category-db";

export interface IGetCategoriesPaginated {
  query: string;
  page: number;
  entries_per_page: number;
}

export type GetCategoriesPaginated = ({
  query,
  page,
  entries_per_page,
}: IGetCategoriesPaginated) => Promise<IPaginatedCategoriesResult>;

export default function makeGetCategoriesPaginated({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategoriesPaginated {
  return async function getCategoriesPaginated({
    query,
    page,
    entries_per_page,
  }) {
    return await categoryDb.findAllPaginated({
      query,
      page,
      entries_per_page,
    });
  };
}
