import { logger } from "../../config/logs/logger";
import { redis } from "../../config/redis";

import { CategoryDb } from "../../data-access";

import makeGetCategory from "./get-category";
import makeDeleteCategory from "./delete-category";
import makeUpdateCategory from "./update-category";
import makeGetCategories from "./get-categories";
import makeCreateCategory from "./create-category";
import makeGetCategoryTitles from "./get-category-titles";
import makeHardDeleteCategory from "./hard-delete-category";
import makeGetCategoryByTitle from "./get-category-by-title";
import makeGetCategoryAnalystics from "./get-category-analystics";
import makeGetCategoriesForSEO from "./get-categories-for-seo";
import makeGetCategoriesPaginated from "./get-categories-paginated";
import makeGetCategoryBySlug from "./get-category-by-slug";

const getCategoryBySlug = makeGetCategoryBySlug({
  categoryDb: CategoryDb,
});

const getCategoriesPaginated = makeGetCategoriesPaginated({
  categoryDb: CategoryDb,
});

const getCategoriesForSEO = makeGetCategoriesForSEO({
  categoryDb: CategoryDb,
  logger,
});

const getCategoryAnalystics = makeGetCategoryAnalystics({
  categoryDb: CategoryDb,
  logger,
  redis,
});

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
  getCategoryAnalystics,
  getCategoriesForSEO,
  getCategoriesPaginated,
  getCategoryBySlug,
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
  getCategoryAnalystics,
  getCategoriesForSEO,
  getCategoriesPaginated,
  getCategoryBySlug,
};
