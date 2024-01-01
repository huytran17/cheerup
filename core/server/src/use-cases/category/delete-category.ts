import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IDeleteCategory = ({ _id }: { _id: string }) => Promise<ICategory>;

export default function makeDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IDeleteCategory {
  return async function deleteCategory({ _id }) {
    return await categoryDb.delete({ _id });
  };
}
