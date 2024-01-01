import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategories = () => Promise<ICategory[]>;

export default function makeGetCategories({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategories {
  return async function getCategories() {
    return await categoryDb.findAll();
  };
}
