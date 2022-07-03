import { redis } from "../../config/storage/redis";
import { logger } from "../../config/storage/logger";

import { CategoryDb } from "../../data-access";

import makeGetCategory from "./get-category";
import makeDeleteCategory from "./delete-category";
import makeUpdateCategory from "./update-category";
import makeGetCategories from "./get-categories";

const getCategory = makeGetCategory({
  categoryDb: CategoryDb,
  redis,
  logger,
});

const deleteCategory = makeDeleteCategory({
  categoryDb: CategoryDb,
});

const updateCategory = makeUpdateCategory({
  categoryDb: CategoryDb,
});

const getCategories = makeGetCategories({
  categoryDb: CategoryDb,
  redis,
  logger,
});

const categoryServices = Object.freeze({
  getCategory,
  deleteCategory,
  updateCategory,
  getCategories,
});

export default categoryServices;

export { getCategory, deleteCategory, updateCategory, getCategories };
