import {
  getCategory,
  deleteCategory,
  updateCategory,
  createCategory,
  getCategories,
  hardDeleteCategory,
  getCategoryByTitle,
  getCategoryAnalystics,
} from "../../../../use-cases/category";
import { logger } from "../../../../config/logs/logger";

import makeGetCategoryController from "./get-category";
import makeDeleteCategoryController from "./delete-category";
import makeUpdateCategoryController from "./update-category";
import makeCreateCategoryController from "./create-category";
import makeGetCategoriesController from "./get-categories";
import makeRestoreCategoryController from "./restore-category";
import makeHardDeleteCategoryController from "./hard-delete-category";
import makeUploadCategoryThumbnailController from "./upload-category-thumbnail";
import makeGetCategoryAnalysticsController from "./get-category-analystics";

const getCategoryAnalysticsController = makeGetCategoryAnalysticsController({
  getCategoryAnalystics,
});

const uploadCategoryThumbnailController = makeUploadCategoryThumbnailController(
  {
    getCategory,
    updateCategory,
  }
);

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
  getCategoryByTitle,
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
  getCategoryByTitle,
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
  uploadCategoryThumbnailController,
  getCategoryAnalysticsController,
});

export {
  getCategoryController,
  deleteCategoryController,
  updateCategoryController,
  createCategoryController,
  getCategoriesController,
  restoreCategoryController,
  hardDeleteCategoryController,
  uploadCategoryThumbnailController,
  getCategoryAnalysticsController,
};
