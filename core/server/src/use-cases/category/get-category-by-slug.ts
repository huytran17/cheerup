import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IGetCategoryBySlugPayload {
  slug: string;
}

export type GetCategoryBySlug = ({
  slug,
}: IGetCategoryBySlugPayload) => Promise<ICategory>;

export default function makeGetCategoryBySlug({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategoryBySlug {
  return async function getCategoryBySlug({ slug }) {
    return await categoryDb.findBySlug({ slug });
  };
}
