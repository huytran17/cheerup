import {
  getCategory,
  getCategories,
  getCategoryTitles,
} from "../../../../use-cases/category";
import { logger } from "../../../../config/logs/logger";

import makeGetCategoryController from "./get-category";
import makeGetCategoriesController from "./get-categories";
import makeGetCategoryTitlesController from "./get-category-titles";

const getCategoryTitlesController = makeGetCategoryTitlesController({
  getCategoryTitles,
  logger,
});

const getCategoriesController = makeGetCategoriesController({
  getCategories,
  logger,
});

const getCategoryController = makeGetCategoryController({
  getCategory,
  logger,
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
