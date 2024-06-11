import { logger } from "../../../../config/logs/logger";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
  getCategoryAnalystics,
  getCategoryByTitle,
  getSoftDeletedCategory,
  hardDeleteCategory,
  updateCategory,
} from "../../../../use-cases/category";
import makeCreateCategoryController from "./create-category";
import makeDeleteCategoryController from "./delete-category";
import makeGetCategoriesController from "./get-categories";
import makeGetCategoryController from "./get-category";
import makeGetCategoryAnalysticsController from "./get-category-analystics";
import makeHardDeleteCategoryController from "./hard-delete-category";
import makeRestoreCategoryController from "./restore-category";
import makeUpdateCategoryController from "./update-category";
import makeUploadCategoryThumbnailController from "./upload-category-thumbnail";

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
  getSoftDeletedCategory,
  updateCategory,
  logger,
});

const getCategoriesController = makeGetCategoriesController({
  getCategories,
});

const createCategoryController = makeCreateCategoryController({
  createCategory,
  logger,
});

const getCategoryController = makeGetCategoryController({
  getCategory,
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
  createCategoryController,
  deleteCategoryController,
  getCategoriesController,
  getCategoryAnalysticsController,
  getCategoryController,
  hardDeleteCategoryController,
  restoreCategoryController,
  updateCategoryController,
  uploadCategoryThumbnailController,
};
