import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type GetCategories = () => Promise<ICategory[]>;

export default function makeGetCategories({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategories {
  return async function getCategories() {
    return await categoryDb.findAll();
  };
}
