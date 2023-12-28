import ICategoryDb, {
  IPaginatedCategoryResult,
} from "../../data-access/interfaces/category-db";

export type IGetCategoriesPaginated = ({
  query,
  page,
  entries_per_page,
}: {
  query: string;
  page: number;
  entries_per_page: number;
}) => Promise<IPaginatedCategoryResult | null>;

export default function makeGetCategoriesPaginated({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoriesPaginated {
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
