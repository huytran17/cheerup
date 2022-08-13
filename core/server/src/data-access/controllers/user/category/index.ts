import { getCategory, getCategories } from "../../../../use-cases/category";
import { logger } from "../../../../config/storage/logger";

import makeGetCategoryController from "./get-category";
import makeGetCategoriesController from "./get-categories";

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
});

export { getCategoryController, getCategoriesController };
