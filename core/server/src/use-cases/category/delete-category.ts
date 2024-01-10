import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IDeleteCategoryPayload {
  _id: string;
}

export type DeleteCategory = ({
  _id,
}: IDeleteCategoryPayload) => Promise<ICategory>;

export default function makeDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): DeleteCategory {
  return async function deleteCategory({ _id }) {
    return await categoryDb.delete({ _id });
  };
}
