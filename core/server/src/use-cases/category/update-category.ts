import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IUpdateCategory extends Partial<ICategory> {
  [key: string]: any;
}

export type UpdateCategory = (payload: IUpdateCategory) => Promise<ICategory>;

export default function makeUpdateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): UpdateCategory {
  return async function updateCategory(payload) {
    return await categoryDb.update(payload);
  };
}
