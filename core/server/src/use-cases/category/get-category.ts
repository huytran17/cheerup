import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategory = ({
  _id,
  is_include_deleted,
}: {
  _id: string;
  is_include_deleted?: boolean;
}) => Promise<ICategory>;

export default function makeGetCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): IGetCategory {
  return async function getCategory({ _id, is_include_deleted }) {
    return await categoryDb.findById({ _id, is_include_deleted });
  };
}
