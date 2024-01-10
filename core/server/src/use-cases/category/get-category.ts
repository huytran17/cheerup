import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IGetCategoryPayload {
  _id: string;
}

export type GetCategory = ({ _id }: IGetCategoryPayload) => Promise<ICategory>;

export default function makeGetCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategory {
  return async function getCategory({ _id }) {
    return await categoryDb.findById({ _id });
  };
}
