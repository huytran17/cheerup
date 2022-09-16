import {
  getPost,
  getPosts,
  getSuggestionPosts,
  getPostsPaginated,
} from "../../../../use-cases/post";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { logger } from "../../../../config/logs/logger";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";
import makeGetLatestPostsController from "./get-suggestion-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";

const getPostsPaginatedController = makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  logger,
});

const getPostsController = makeGetPostsController({
  getPosts,
  countCommentsByPost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

const getSuggestionPostsController = makeGetLatestPostsController({
  getSuggestionPosts,
  logger,
});

export default Object.freeze({
  getPostController,
  getPostsController,
  getSuggestionPostsController,
  getPostsPaginatedController,
});

export {
  getPostController,
  getPostsController,
  getSuggestionPostsController,
  getPostsPaginatedController,
};
