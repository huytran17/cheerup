import {
  getCategoriesPaginated,
  getCategoryBySlug,
  getCategoryTitles,
} from "../../../../use-cases/category";
import { countPostByCategory } from "../../../../use-cases/post";
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

export default Object.freeze({
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
  getCategoryBySlugController,
});

export {
  getCategoryBySlugController,
  getCategoryTitlesController,
  getOutstandingCategoriesPaginatedController,
};
