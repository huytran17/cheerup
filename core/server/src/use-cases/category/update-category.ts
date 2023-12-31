import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IUpdateCategoryData {
  categoryDetails: Omit<ICategory, "_id">;
}

export type IUpdateCategory = ({
  categoryDetails,
}: IUpdateCategoryData) => Promise<Category>;

export default function makeUpdateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IUpdateCategory {
  return async function updateCategory({ categoryDetails }) {
    return await categoryDb.update(categoryDetails);
  };
}
