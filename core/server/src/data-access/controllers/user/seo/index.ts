import { getPostsForSEO } from "../../../../use-cases/post";
import { getCategoriesForSEO } from "../../../../use-cases/category";

import makeGetPostsForSEOController from "./get-posts-for-seo";
import makeGetCategoriesForSEOController from "./get-categories-for-seo";

const getCategoriesForSEOController = makeGetCategoriesForSEOController({
  getCategoriesForSEO,
});

const getPostsForSEOController = makeGetPostsForSEOController({
  getPostsForSEO,
});

export default Object.freeze({
  getPostsForSEOController,
  getCategoriesForSEOController,
});

export { getPostsForSEOController, getCategoriesForSEOController };
