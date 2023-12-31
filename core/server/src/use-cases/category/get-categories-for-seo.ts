import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoriesForSEO = () => Promise<Category[]>;

export default function makeGetCategoriesForSEO({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoriesForSEO {
  return async function getCategoriesForSEO() {
    return await categoryDb.findAllForSEO();
  };
}
