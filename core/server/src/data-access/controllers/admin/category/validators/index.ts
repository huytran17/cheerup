import createCategoryRules from "./create-category";
import deleteCategoryRules from "./delete-category";
import getCategoriesPaginatedRules from "./get-categories-paginated";
import getCategoryRules from "./get-category";
import getCategoryAnalysticsRules from "./get-category-analystics";
import hardDeleteCategoryRules from "./hard-delete-category";
import restoreCategoryRules from "./restore-category";
import updateCategoryRules from "./update-category";
import uploadCategoryThumbnailRules from "./upload-category-thumbnail";

export default Object.freeze({
  getCategoryRules,
  deleteCategoryRules,
  updateCategoryRules,
  createCategoryRules,
  restoreCategoryRules,
  hardDeleteCategoryRules,
  uploadCategoryThumbnailRules,
  getCategoryAnalysticsRules,
  getCategoriesPaginatedRules,
});

export {
  createCategoryRules,
  deleteCategoryRules,
  getCategoriesPaginatedRules,
  getCategoryAnalysticsRules,
  getCategoryRules,
  hardDeleteCategoryRules,
  restoreCategoryRules,
  updateCategoryRules,
  uploadCategoryThumbnailRules,
};
