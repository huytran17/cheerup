import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoryBySlug = ({
  slug,
}: {
  slug: string;
}) => Promise<Category>;

export default function makeGetCategoryBySlug({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategoryBySlug {
  return async function getCategoryBySlug({ slug }) {
    return await categoryDb.findBySlug({ slug });
  };
}
