import { getCategoriesForSEO } from "../../../../use-cases/category";
import { getPostsForSEO } from "../../../../use-cases/post";
import makeGetCategoriesForSEOController from "./get-categories-for-seo";
import makeGetPostsForSEOController from "./get-posts-for-seo";

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

export { getCategoriesForSEOController, getPostsForSEOController };
