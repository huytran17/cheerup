import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IDeleteCategory = ({
  _id,
  last_deleted_by,
}: {
  _id: string;
  last_deleted_by: string;
}) => Promise<Category | null>;

export default function makeDeleteCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IDeleteCategory {
  return async function deleteCategory({
    _id,
    last_deleted_by,
  }: {
    _id: string;
    last_deleted_by: string;
  }): Promise<Category | null> {
    const category = await categoryDb.delete({ _id, last_deleted_by });
    return category;
  };
}
