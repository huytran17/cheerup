import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IUpdateCategoryPayload extends Partial<ICategory> {
  [key: string]: any;
}

export type UpdateCategory = (
  payload: IUpdateCategoryPayload
) => Promise<ICategory>;

export default function makeUpdateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): UpdateCategory {
  return async function updateCategory(payload) {
    return await categoryDb.update(payload);
  };
}
