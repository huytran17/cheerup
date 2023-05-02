import {
  getCategory,
  getCategories,
  getCategoryTitles,
  getCategoriesPaginated,
  getCategoryBySlug,
} from "../../../../use-cases/category";
import { countPostByCategory } from "../../../../use-cases/post";

import makeGetCategoryController from "./get-category";
import makeGetCategoriesController from "./get-categories";
import makeGetCategoryTitlesController from "./get-category-titles";
import makeGetOutstandingCategoriesPaginatedController from "./get-outstanding-categories-paginated";
import makeGetCategoryBySlugController from "./get-category-by-slug";

const getCategoryBySlugController = makeGetCategoryBySlugController({
  getCategoryBySlug,
});

const getOutstandingCategoriesPaginatedController =
  makeGetOutstandingCategoriesPaginatedController({
    countPostByCategory,
    getCategoriesPaginated,
  });

const getCategoryTitlesController = makeGetCategoryTitlesController({
  getCategoryTitles,
});

const getCategoriesController = makeGetCategoriesController({
  getCategories,
});

const getCategoryController = makeGetCategoryController({
  getCategory,
});

export default Object.freeze({
  getCategoryController,
  getCategoriesController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
  getCategoryBySlugController,
});

export {
  getCategoryController,
  getCategoriesController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
  getCategoryBySlugController,
};
