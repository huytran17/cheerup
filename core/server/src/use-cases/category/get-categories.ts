import { Logger } from "winston";
import Redis from "../../config/storage/redis";
import Category from "../../database/entities/category";
import ICategoryDb from "../../data-access/interfaces/category-db";

export type IGetCategories = () => Promise<Category[] | null>;

export default function makeGetCategories({
  categoryDb,
  redis,
  logger,
}: {
  categoryDb: ICategoryDb;
  redis: Redis;
  logger: Logger;
}): IGetCategories {
  return async function getCategories(): Promise<Category[] | null> {
    const categories = await categoryDb.findAll();
    return categories;
  };
}
