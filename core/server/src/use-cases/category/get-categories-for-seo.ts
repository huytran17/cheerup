import { Logger } from "winston";
import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategoriesForSEO = () => Promise<Category[] | null>;

export default function makeGetCategoriesForSEO({
  categoryDb,
  logger,
}: {
  categoryDb: ICategoryDb;
  logger: Logger;
}): IGetCategoriesForSEO {
  return async function getCategoriesForSEO(): Promise<Category[] | null> {
    const categories = await categoryDb.findAllForSEO();
    return categories;
  };
}
