import {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
} from "../../../../use-cases/category";
import { logger } from "../../../../config/storage/logger";

import makeGetCategoryController from "./get-category";
import makeDeleteCategory from "./delete-category";
import makeUpdateCategory from "./update-category";
import makeCreateCategory from "./create-category";

const createCategoryController = makeCreateCategory({
  createCategory,
  logger,
});

const getCategoryController = makeGetCategoryController({
  getCategory,
  logger,
});

const deleteCategoryController = makeDeleteCategory({
  getCategory,
  deleteCategory,
  logger,
});

const updateCategoryController = makeUpdateCategory({
  getCategory,
  updateCategory,
  logger,
});

export default Object.freeze({
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
});

export {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
};
