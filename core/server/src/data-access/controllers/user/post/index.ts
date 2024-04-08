import moment from "moment";
import { logger } from "../../../../config/logs/logger";
import { readingTimeAnalyzer } from "../../../../config/reading-time";
import { countCommentsByPost } from "../../../../use-cases/comment";
import {
  getPost,
  getPostBySlug,
  getPosts,
  getPostsPaginated,
  getSuggestionPosts,
  increasePostViews,
  updatePost,
} from "../../../../use-cases/post";
import { getPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark";
import makeExportPostPdfController from "./export-post-pdf";
import makeGetPostController from "./get-post";
import makeGetPostBySlugController from "./get-post-by-slug";
import makeGetPostsController from "./get-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import makeIncreasePostViewsController from "./increase-post-views";
import makeUpdatePostController from "./update-post";

const increasePostViewsController = makeIncreasePostViewsController({
  getPost,
  increasePostViews,
});

const getPostBySlugController = makeGetPostBySlugController({
  getPostBySlug,
  readingTimeAnalyzer,
  getPostBookmarkByUserAndPost,
});

const exportPostPdfController = makeExportPostPdfController({
  getPost,
  readingTimeAnalyzer,
  moment,
});

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
  exportPostPdfController,
  getPostBySlugController,
  increasePostViewsController,
});

export {
  exportPostPdfController,
  getPostBySlugController,
  getPostController,
  getPostsController,
  getPostsPaginatedController,
  getSuggestionPostsController,
  updatePostController,
  increasePostViewsController,
};
