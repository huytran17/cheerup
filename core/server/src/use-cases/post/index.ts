import { logger } from "../../config/storage/logger";

import { PostDb } from "../../data-access";

import makeGetPost from "./get-post";
import makeDeletePost from "./delete-post";
import makeUpdatePost from "./update-post";
import makeCreatePost from "./create-post";
import makeGetPosts from "./get-posts";
import makeHardDeletePost from "./hard-delete-post";
import makeGetPostAnalystics from "./get-post-analystics";
import makeGetHighlightPost from "./get-highlight-post";
import makeGetLatestPosts from "./get-latest-posts";

const getLatestPosts = makeGetLatestPosts({
  postDb: PostDb,
  logger,
});

const getHighlightPost = makeGetHighlightPost({
  postDb: PostDb,
  logger,
});

const getPostAnalystics = makeGetPostAnalystics({
  postDb: PostDb,
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
  getHighlightPost,
  getLatestPosts,
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
  getHighlightPost,
  getLatestPosts,
};
