import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IHardDeleteCategory = ({
  _id,
}: {
  _id: string;
}) => Promise<ICategory>;

export default function makeHardDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IHardDeleteCategory {
  return async function hardDeleteCategory({ _id }) {
    return await categoryDb.hardDelete({ _id });
  };
}
