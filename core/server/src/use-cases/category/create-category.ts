import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface ICreateCategoryPayload extends Partial<ICategory> {}

interface ICreateCategory {
  categoryDetails: ICreateCategoryPayload;
}

export type CreateCategory = ({
  categoryDetails,
}: ICreateCategory) => Promise<ICategory>;

export default function makeCreateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): CreateCategory {
  return async function createCategory({ categoryDetails }) {
    return await categoryDb.insert(categoryDetails);
  };
}
