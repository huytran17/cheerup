import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface ICreateCategoryData {
  categoryDetails: Omit<ICategory, "_id">;
}

export type ICreateCategory = ({
  categoryDetails,
}: ICreateCategoryData) => Promise<Category | null>;

export default function makeCreateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): ICreateCategory {
  return async function createCategory({
    categoryDetails,
  }: ICreateCategoryData): Promise<Category | null> {
    const category = await categoryDb.insert(categoryDetails);
    return category;
  };
}
