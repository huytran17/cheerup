import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategories = () => Promise<Category[]>;

export default function makeGetCategories({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategories {
  return async function getCategories() {
    return await categoryDb.findAll();
  };
}
