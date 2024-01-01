import ICategoryDb from "../../data-access/interfaces/category-db";

export type GetCategoryTitles = () => Promise<
  { _id: string; title: string; slug: string }[]
>;

export default function makeGetCategoryTitles({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategoryTitles {
  return async function getCategoryTitles() {
    return await categoryDb.findAllCategoryTitles();
  };
}
