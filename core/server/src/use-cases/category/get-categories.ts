import { Logger } from "winston";
import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategories = () => Promise<Category[] | null>;

export default function makeGetCategories({
  categoryDb,
  logger,
}: {
  categoryDb: ICategoryDb;
  logger: Logger;
}): IGetCategories {
  return async function getCategories(): Promise<Category[] | null> {
    const categories = await categoryDb.findAll();
    return categories;
  };
}
