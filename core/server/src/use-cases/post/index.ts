import { logger } from "../../config/logs/logger";
import { randomCacheTime } from "../../config/random-cache-time";
import { redis } from "../../config/redis";
import { PostDb } from "../../data-access";
import makeCountPostByCategory from "./count-post-by-category";
import makeCreatePost from "./create-post";
import makeDeletePost from "./delete-post";
import makeGetMostPopularPostsAnalystics from "./get-most-popular-posts-analystics";
import makeGetPost from "./get-post";
import makeGetPostAnalystics from "./get-post-analystics";
import makeGetPostBySlug from "./get-post-by-slug";
import makeGetPosts from "./get-posts";
import makeGetPostsForSEO from "./get-posts-for-seo";
import makeGetPostsPaginated from "./get-posts-paginated";
import makeGetSoftDeletedPost from "./get-soft-deleted-post";
import makeGetSuggestionPosts from "./get-suggestion-posts";
import makeHardDeletePost from "./hard-delete-post";
import makeIncreasePostViews from "./increase-post-views";
import makeUpdatePost from "./update-post";

const increasePostViews = makeIncreasePostViews({
  postDb: PostDb,
});

const getSoftDeletedPost = makeGetSoftDeletedPost({
  postDb: PostDb,
});

const getPostBySlug = makeGetPostBySlug({
  postDb: PostDb,
});

const countPostByCategory = makeCountPostByCategory({
  postDb: PostDb,
  randomCacheTime,
  logger,
  redis,
});

const getPostsForSEO = makeGetPostsForSEO({
  postDb: PostDb,
  randomCacheTime,
  redis,
  logger,
});

const getMostPopularPostsAnalystics = makeGetMostPopularPostsAnalystics({
  postDb: PostDb,
  randomCacheTime,
  logger,
  redis,
});

const getPostsPaginated = makeGetPostsPaginated({
  postDb: PostDb,
  randomCacheTime,
  redis,
  logger,
});

const getSuggestionPosts = makeGetSuggestionPosts({
  postDb: PostDb,
  randomCacheTime,
  redis,
  logger,
});

const getPostAnalystics = makeGetPostAnalystics({
  postDb: PostDb,
  randomCacheTime,
  redis,
  logger,
});

const hardDeletePost = makeHardDeletePost({
  postDb: PostDb,
});

const getPost = makeGetPost({
  postDb: PostDb,
});

const deletePost = makeDeletePost({
  postDb: PostDb,
});

const updatePost = makeUpdatePost({
  postDb: PostDb,
});

const createPost = makeCreatePost({
  postDb: PostDb,
});

const getPosts = makeGetPosts({
  postDb: PostDb,
  randomCacheTime,
  redis,
  logger,
});

const postServices = Object.freeze({
  getPost,
  deletePost,
  updatePost,
  getPosts,
  createPost,
  hardDeletePost,
  getPostAnalystics,
  getSuggestionPosts,
  getPostsPaginated,
  getMostPopularPostsAnalystics,
  getPostsForSEO,
  countPostByCategory,
  getPostBySlug,
  getSoftDeletedPost,
  increasePostViews,
});

export default postServices;

export {
  countPostByCategory,
  createPost,
  deletePost,
  getMostPopularPostsAnalystics,
  getPost,
  getPostAnalystics,
  getPostBySlug,
  getPosts,
  getPostsForSEO,
  getPostsPaginated,
  getSoftDeletedPost,
  getSuggestionPosts,
  hardDeletePost,
  increasePostViews,
  updatePost,
};
