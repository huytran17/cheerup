import moment from "moment";
import { readingTimeAnalyzer } from "../../../../config/reading-time";
import { countCommentsByPost } from "../../../../use-cases/comment";
import {
  getPost,
  getPostBySlug,
  getPosts,
  getPostsPaginated,
  getSuggestionPosts,
  increasePostViews,
} from "../../../../use-cases/post";
import { getPostBookmarkByUserAndPost } from "../../../../use-cases/post-bookmark";
import makeExportPostPdfController from "./export-post-pdf";
import makeGetPostBySlugController from "./get-post-by-slug";
import makeGetPostsController from "./get-posts";
import makeGetPostsPaginatedController from "./get-posts-paginated";
import makeGetSuggestionPostsController from "./get-suggestion-posts";
import makeIncreasePostViewsController from "./increase-post-views";

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

const getSuggestionPostsController = makeGetSuggestionPostsController({
  getSuggestionPosts,
});

export default Object.freeze({
  getPostsController,
  getSuggestionPostsController,
  getPostsPaginatedController,
  exportPostPdfController,
  getPostBySlugController,
  increasePostViewsController,
});

export {
  exportPostPdfController,
  getPostBySlugController,
  getPostsController,
  getPostsPaginatedController,
  getSuggestionPostsController,
  increasePostViewsController,
};
