import {
  batchUploadCategories,
  getCategory,
  updateCategory,
} from "../../../../../use-cases/category";
import makeBatchUploadCategoriesController from "./batch-upload-categories";
import makeUploadCategoryThumbnailController from "./upload-category-thumbnail";

const batchUploadCategoriesController = makeBatchUploadCategoriesController({
  batchUploadCategories,
});

const uploadCategoryThumbnailController = makeUploadCategoryThumbnailController(
  {
    getCategory,
    updateCategory,
  }
);

export default Object.freeze({
  uploadCategoryThumbnailController,
  batchUploadCategoriesController,
});

export { batchUploadCategoriesController, uploadCategoryThumbnailController };
