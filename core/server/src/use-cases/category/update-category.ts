import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IUpdateCategoryData {
  categoryDetails: Omit<ICategory, "_id">;
}

export type UpdateCategory = ({
  categoryDetails,
}: IUpdateCategoryData) => Promise<ICategory>;

export default function makeUpdateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): UpdateCategory {
  return async function updateCategory({ categoryDetails }) {
    return await categoryDb.update(categoryDetails);
  };
}
