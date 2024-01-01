import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface ICreateCategoryData {
  categoryDetails: Omit<ICategory, "_id">;
}

export type CreateCategory = ({
  categoryDetails,
}: ICreateCategoryData) => Promise<ICategory>;

export default function makeCreateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): CreateCategory {
  return async function createCategory({ categoryDetails }) {
    return await categoryDb.insert(categoryDetails);
  };
}
