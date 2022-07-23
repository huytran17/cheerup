import {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
  getCategories,
} from "../../../../use-cases/category";
import { logger } from "../../../../config/storage/logger";

import makeGetCategoryController from "./get-category";
import makeDeleteCategoryController from "./delete-category";
import makeUpdateCategoryController from "./update-category";
import makeCreateCategoryController from "./create-category";
import makeGetCategoriesController from "./get-categories";

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
});

export {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
};
