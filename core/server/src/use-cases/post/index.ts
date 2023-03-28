import { logger } from "../../config/logs/logger";
import { redis } from "../../config/redis";

import { PostDb } from "../../data-access";

import makeGetPost from "./get-post";
import makeDeletePost from "./delete-post";
import makeUpdatePost from "./update-post";
import makeCreatePost from "./create-post";
import makeGetPosts from "./get-posts";
import makeHardDeletePost from "./hard-delete-post";
import makeGetPostAnalystics from "./get-post-analystics";
import makeGetSuggestionPosts from "./get-suggestion-posts";
import makeGetPostsPaginated from "./get-posts-paginated";
import makeGetMostPopularPostsAnalystics from "./get-most-popular-posts-analystics";

const getMostPopularPostsAnalystics = makeGetMostPopularPostsAnalystics({
  postDb: PostDb,
  logger,
  redis,
});

const getPostsPaginated = makeGetPostsPaginated({
  postDb: PostDb,
  logger,
});

const getSuggestionPosts = makeGetSuggestionPosts({
  postDb: PostDb,
  logger,
});

const getPostAnalystics = makeGetPostAnalystics({
  postDb: PostDb,
  redis,
  logger,
});

const hardDeletePost = makeHardDeletePost({
  postDb: PostDb,
  logger,
});

const getPost = makeGetPost({
  postDb: PostDb,
  logger,
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
});

export default postServices;

export {
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
};
