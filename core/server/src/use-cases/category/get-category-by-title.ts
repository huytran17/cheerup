import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type GetCategoryByTitle = ({
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
}): GetCategoryByTitle {
  return async function getCategoryByTitle({ title, is_include_deleted }) {
    return await categoryDb.findByTitle({
      title,
      is_include_deleted,
    });
  };
}
