import ICategoryDb from "../../data-access/interfaces/category-db";
import ICategory from "../../database/interfaces/category";

export interface IBatchUploadCategories extends Partial<ICategory> {
  [key: string]: any;
}

export type BatchUploadCategories = (
  payload: IBatchUploadCategories[]
) => Promise<ICategory[]>;

export default function makeBatchUploadCategories({
  categoryDb,
}: {
  categoryDb: ICategoryDb;
}): BatchUploadCategories {
  return async function batchUploadCategories(payload) {
    return await categoryDb.insertMany(payload);
  };
}
