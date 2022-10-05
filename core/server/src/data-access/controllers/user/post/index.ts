import {
  getPost,
  getPosts,
  getSuggestionPosts,
  getPostsPaginated,
} from "../../../../use-cases/post";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { getPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark";
import { logger } from "../../../../config/logs/logger";
import { readingTimeAnalyzer } from "../../../../config/reading-time";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";

const getPostsPaginatedController = makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  getPostBookmarkByUserAndPost,
  readingTimeAnalyzer,
  logger,
});

const getPostsController = makeGetPostsController({
  getPosts,
  countCommentsByPost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  logger,
});

const getSuggestionPostsController = makeGetSuggestionPostsController({
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
