import ICategoryDb from "../../data-access/interfaces/category-db";
import { Logger } from "winston";

export type IGetCategoryTitles = () => Promise<
  { _id: string; title: string }[]
>;

export default function makeGetCategoryTitles({
  categoryDb,
  logger,
}: {
  categoryDb: ICategoryDb;
  logger: Logger;
}): IGetCategoryTitles {
  return async function getCategoryTitles(): Promise<
    { _id: string; title: string }[]
  > {
    const category = await categoryDb.findAllCategoryTitles();
    return category;
  };
}
