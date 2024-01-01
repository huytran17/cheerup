import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type GetCategoryBySlug = ({
  slug,
}: {
  slug: string;
}) => Promise<ICategory>;

export default function makeGetCategoryBySlug({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategoryBySlug {
  return async function getCategoryBySlug({ slug }) {
    return await categoryDb.findBySlug({ slug });
  };
}
