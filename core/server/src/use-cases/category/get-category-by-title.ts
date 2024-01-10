import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IGetCategoryByTitlePayload {
  title: string;
}

export type GetCategoryByTitle = ({
  title,
}: IGetCategoryByTitlePayload) => Promise<ICategory>;

export default function makeGetCategoryByTitle({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategoryByTitle {
  return async function getCategoryByTitle({ title }) {
    return await categoryDb.findByTitle({
      title,
    });
  };
}
