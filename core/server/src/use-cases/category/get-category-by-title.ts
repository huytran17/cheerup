import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import { Logger } from "winston";

export type IGetCategoryByTitle = ({
  title,
  is_include_deleted,
}: {
  title: string;
  is_include_deleted?: boolean;
}) => Promise<Category | null>;

export default function makeGetCategoryByTitle({
  categoryDb,
  logger,
}: {
  categoryDb: ICategoryDb;
  logger: Logger;
}): IGetCategoryByTitle {
  return async function getCategoryByTitle({
    title,
    is_include_deleted,
  }: {
    title: string;
    is_include_deleted?: boolean;
  }): Promise<Category | null> {
    const category = await categoryDb.findByTitle({
      title,
      is_include_deleted,
    });
    return category;
  };
}
