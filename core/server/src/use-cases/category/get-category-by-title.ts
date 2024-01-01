import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoryByTitle = ({
  title,
  is_include_deleted,
}: {
  title: string;
  is_include_deleted?: boolean;
}) => Promise<ICategory>;

export default function makeGetCategoryByTitle({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoryByTitle {
  return async function getCategoryByTitle({ title, is_include_deleted }) {
    return await categoryDb.findByTitle({
      title,
      is_include_deleted,
    });
  };
}
