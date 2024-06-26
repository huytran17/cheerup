import {
  getCategories,
  getCategoriesPaginated,
  getCategory,
  getCategoryBySlug,
  getCategoryTitles,
} from "../../../../use-cases/category";
import { countPostByCategory } from "../../../../use-cases/post";
import makeGetCategoriesController from "./get-categories";
import makeGetCategoryController from "./get-category";
import makeGetCategoryBySlugController from "./get-category-by-slug";
import makeGetCategoryTitlesController from "./get-category-titles";
import makeGetOutstandingCategoriesPaginatedController from "./get-outstanding-categories-paginated";

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
  getCategoriesController,
  getCategoryBySlugController,
  getCategoryController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
};
