import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";
import { Logger } from "winston";

export type IGetCategory = ({
  _id,
}: {
  _id: string;
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
  }: {
    _id: string;
  }): Promise<Category | null> {
    const category = await categoryDb.findById({ _id });
    return category;
  };
}
