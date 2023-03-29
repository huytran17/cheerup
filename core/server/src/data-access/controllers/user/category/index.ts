import {
  getCategory,
  getCategories,
  getCategoryTitles,
} from "../../../../use-cases/category";

import makeGetCategoryController from "./get-category";
import makeGetCategoriesController from "./get-categories";
import makeGetCategoryTitlesController from "./get-category-titles";

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
});

export {
  getCategoryController,
  getCategoriesController,
  getCategoryTitlesController,
};
