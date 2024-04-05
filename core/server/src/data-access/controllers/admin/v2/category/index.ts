import { getCategory, updateCategory } from "../../../../../use-cases/category";

import makeUploadCategoryThumbnailController from "./upload-category-thumbnail";

const uploadCategoryThumbnailController = makeUploadCategoryThumbnailController(
  {
    getCategory,
    updateCategory,
  }
);

export default Object.freeze({
  uploadCategoryThumbnailController,
});

export { uploadCategoryThumbnailController };
