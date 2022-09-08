import { getPost, getPosts, getLatestPosts } from "../../../../use-cases/post";
import { countCommentsByPost } from "../../../../use-cases/comment";
import { logger } from "../../../../config/storage/logger";

import makeGetPostController from "./get-post";
import makeGetPostsController from "./get-posts";
import makeGetLatestPostsController from "./get-latest-posts";
import makeGetLatestPostsController from "./get-latest-posts";

const getPostsController = makeGetPostsController({
  getPosts,
  countCommentsByPost,
  logger,
});

const getPostController = makeGetPostController({
  getPost,
  logger,
});

const getLatestPostsController = makeGetLatestPostsController({
  getLatestPosts,
  logger,
});

export default Object.freeze({
  getPostController,
  getPostsController,
  getLatestPostsController,
});

export { getPostController, getPostsController, getLatestPostsController };
