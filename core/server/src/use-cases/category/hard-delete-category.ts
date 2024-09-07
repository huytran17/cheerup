import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IHardDeleteCategory {
  _id: string;
}

export type HardDeleteCategory = ({
  _id,
}: IHardDeleteCategory) => Promise<ICategory>;

export default function makeHardDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): HardDeleteCategory {
  return async function hardDeleteCategory({ _id }) {
    return await categoryDb.hardDelete({ _id });
  };
}
