import {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
  getCategories,
  hardDeleteCategory,
} from "../../../../use-cases/category";
import { logger } from "../../../../config/storage/logger";

import makeGetCategoryController from "./get-category";
import makeDeleteCategoryController from "./delete-category";
import makeUpdateCategoryController from "./update-category";
import makeCreateCategoryController from "./create-category";
import makeGetCategoriesController from "./get-categories";
import makeRestoreCategoryController from "./restore-category";
import makeHardDeleteCategoryController from "./hard-delete-category";

const hardDeleteCategoryController = makeHardDeleteCategoryController({
  getCategory,
  hardDeleteCategory,
  logger,
});

const restoreCategoryController = makeRestoreCategoryController({
  getCategory,
  updateCategory,
  logger,
});

const getCategoriesController = makeGetCategoriesController({
  getCategories,
  logger,
});

const createCategoryController = makeCreateCategoryController({
  createCategory,
  logger,
});

const getCategoryController = makeGetCategoryController({
  getCategory,
  logger,
});

const deleteCategoryController = makeDeleteCategoryController({
  getCategory,
  deleteCategory,
  logger,
});

const updateCategoryController = makeUpdateCategoryController({
  getCategory,
  updateCategory,
  logger,
});

export default Object.freeze({
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
  restoreCategoryController,
  hardDeleteCategoryController,
});

export {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
  restoreCategoryController,
  hardDeleteCategoryController,
};
