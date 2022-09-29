import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import { Logger } from "winston";

export type IGetCategory = ({
  _id,
  is_include_deleted,
}: {
  _id: string;
  is_include_deleted?: boolean;
}) => Promise<Category | null>;

export default function makeGetCategory({
  categoryDb,
  logger,
}: {
  categoryDb: ICategoryDb;
  logger: Logger;
}): IGetCategory {
  return async function getCategory({
    _id,
    is_include_deleted,
  }: {
    _id: string;
    is_include_deleted?: boolean;
  }): Promise<Category | null> {
    const category = await categoryDb.findById({ _id, is_include_deleted });
    return category;
  };
}
