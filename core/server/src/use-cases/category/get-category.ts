import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type GetCategory = ({ _id }: { _id: string }) => Promise<ICategory>;

export default function makeGetCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetCategory {
  return async function getCategory({ _id }) {
    return await categoryDb.findById({ _id });
  };
}
