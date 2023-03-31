import {
  getPost,
  getPosts,
  getSuggestionPosts,
  getPostsPaginated,
  updatePost,
} from "../../../../use-cases/post";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { getPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark";
import { readingTimeAnalyzer } from "../../../../config/reading-time";
import { logger } from "../../../../config/logs/logger";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";
import makeUpdatePostController from "./update-post";

const updatePostController = makeUpdatePostController({
  getPost,
  updatePost,
  logger,
});

const getPostsPaginatedController = makeGetPostsPaginatedController({
  getPostsPaginated,
  countCommentsByPost,
  getPostBookmarkByUserAndPost,
  readingTimeAnalyzer,
});

const getPostsController = makeGetPostsController({
  getPosts,
  countCommentsByPost,
});

const getPostController = makeGetPostController({
  getPost,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
});

const getSuggestionPostsController = makeGetSuggestionPostsController({
  getSuggestionPosts,
});

export default Object.freeze({
  getPostController,
  getPostsController,
  getSuggestionPostsController,
  getPostsPaginatedController,
  updatePostController,
});

export {
  getPostController,
  getPostsController,
  getSuggestionPostsController,
  getPostsPaginatedController,
  updatePostController,
};
