import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IUpdateCategoryPayload extends Partial<ICategory> {
  [key: string]: any;
}

interface IUpdateCategory {
  categoryDetails: IUpdateCategoryPayload;
}

export type UpdateCategory = ({
  categoryDetails,
}: IUpdateCategory) => Promise<ICategory>;

export default function makeUpdateCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): UpdateCategory {
  return async function updateCategory({ categoryDetails }) {
    return await categoryDb.update(categoryDetails);
  };
}
