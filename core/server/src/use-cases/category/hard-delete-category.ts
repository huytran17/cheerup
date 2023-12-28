import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IHardDeleteCategory = ({
  _id,
}: {
  _id: string;
}) => Promise<Category | null>;

export default function makeHardDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IHardDeleteCategory {
  return async function hardDeleteCategory({ _id }) {
    return await categoryDb.hardDelete({ _id });
  };
}
