import ICategory from "../../database/interfaces/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export interface IGetSoftDeletedCategoryPayload {
  _id: string;
}

export type GetSoftDeletedCategory = ({
  _id,
}: IGetSoftDeletedCategoryPayload) => Promise<ICategory>;

export default function makeGetSoftDeletedCategory({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): GetSoftDeletedCategory {
  return async function getSoftDeletedCategory({ _id }) {
    return await categoryDb.findSoftDeletedById({ _id });
  };
}
