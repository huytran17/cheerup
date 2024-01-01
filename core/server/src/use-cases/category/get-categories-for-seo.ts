import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoriesForSEO = () => Promise<ICategory[]>;

export default function makeGetCategoriesForSEO({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoriesForSEO {
  return async function getCategoriesForSEO() {
    return await categoryDb.findAllForSEO();
  };
}
