import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface ICreateCategory extends Partial<ICategory> {}

export type CreateCategory = (payload: ICreateCategory) => Promise<ICategory>;

export default function makeCreateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): CreateCategory {
  return async function createCategory(payload) {
    return await categoryDb.insert(payload);
  };
}
