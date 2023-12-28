import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoryTitles = () => Promise<
  { _id: string; title: string; slug: string }[]
>;

export default function makeGetCategoryTitles({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoryTitles {
  return async function getCategoryTitles() {
    return await categoryDb.findAllCategoryTitles();
  };
}
