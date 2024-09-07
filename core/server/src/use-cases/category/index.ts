import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { CategoryDb } from "../../data-access";
import makeCreateCategory from "./create-category";
import makeDeleteCategory from "./delete-category";
import makeGetCategories from "./get-categories";
import makeGetCategoriesForSEO from "./get-categories-for-seo";
import makeGetCategoriesPaginated from "./get-categories-paginated";
import makeGetCategory from "./get-category";
import makeGetCategoryAnalystics from "./get-category-analystics";
import makeGetCategoryBySlug from "./get-category-by-slug";
import makeGetCategoryByTitle from "./get-category-by-title";
import makeGetCategoryTitles from "./get-category-titles";
import makeGetSoftDeletedCategory from "./get-soft-deleted-category";
import makeHardDeleteCategory from "./hard-delete-category";
import makeUpdateCategory from "./update-category";

const getSoftDeletedCategory = makeGetSoftDeletedCategory({
  categoryDb: CategoryDb,
});

const getCategoryBySlug = makeGetCategoryBySlug({
  categoryDb: CategoryDb,
});

const getCategoriesPaginated = makeGetCategoriesPaginated({
  categoryDb: CategoryDb,
  randomCacheTime,
  redis,
  logger,
});

const getCategoriesForSEO = makeGetCategoriesForSEO({
  categoryDb: CategoryDb,
  randomCacheTime,
  redis,
  logger,
});

const getCategoryAnalystics = makeGetCategoryAnalystics({
  categoryDb: CategoryDb,
  randomCacheTime,
  logger,
  redis,
});

const getCategoryByTitle = makeGetCategoryByTitle({
  categoryDb: CategoryDb,
});

const getCategoryTitles = makeGetCategoryTitles({
  categoryDb: CategoryDb,
  randomCacheTime,
  redis,
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
});

const deleteCategory = makeDeleteCategory({
  categoryDb: CategoryDb,
});

const updateCategory = makeUpdateCategory({
  categoryDb: CategoryDb,
});

const getCategories = makeGetCategories({
  categoryDb: CategoryDb,
  randomCacheTime,
  redis,
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
  getCategoryAnalystics,
  getCategoriesForSEO,
  getCategoriesPaginated,
  getCategoryBySlug,
  getSoftDeletedCategory,
});

export default categoryServices;

export {
  createCategory,
  deleteCategory,
  getCategories,
  getCategoriesForSEO,
  getCategoriesPaginated,
  getCategory,
  getCategoryAnalystics,
  getCategoryBySlug,
  getCategoryByTitle,
  getCategoryTitles,
  getSoftDeletedCategory,
  hardDeleteCategory,
  updateCategory,
};
