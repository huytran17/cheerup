import { logger } from "../../config/logs/logger";

import { CategoryDb } from "../../data-access";

import makeGetCategory from "./get-category";
import makeDeleteCategory from "./delete-category";
import makeUpdateCategory from "./update-category";
import makeGetCategories from "./get-categories";
import makeCreateCategory from "./create-category";
import makeGetCategoryTitles from "./get-category-titles";
import makeHardDeleteCategory from "./hard-delete-category";
import makeGetCategoryByTitle from "./get-category-by-title";

const getCategoryByTitle = makeGetCategoryByTitle({
  categoryDb: CategoryDb,
  logger,
});

const getCategoryTitles = makeGetCategoryTitles({
  categoryDb: CategoryDb,
  logger,
});

const hardDeleteCategory = makeHardDeleteCategory({
  categoryDb: CategoryDb,
});

const createCategory = makeCreateCategory({
  categoryDb: CategoryDb,
});

const getCategory = makeGetCategory({
  categoryDb: CategoryDb,
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
  logger,
});

const categoryServices = Object.freeze({
  getCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  createCategory,
  hardDeleteCategory,
  getCategoryTitles,
  getCategoryByTitle,
});

export default categoryServices;

export {
  getCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  createCategory,
  hardDeleteCategory,
  getCategoryTitles,
  getCategoryByTitle,
};
